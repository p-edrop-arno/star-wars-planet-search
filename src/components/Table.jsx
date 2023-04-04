import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  // estado obtido pelo hook, através do useContext.
  const { planets, fetched } = useContext(AppContext);

  /*
  estados para gerenciar mudanças na tabela:
   planetas selecionados,
   campo para busca,
   filtro da coluna,
   filtro para comparação,
   valor da comparação,
   estados dos filtros,
   e opções de filtragem.
  */
  const [planetsSelected, setPlanetsSelected] = useState([]);
  const [searchEntry, setSearchEntry] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [compariosonFilter, setCompariosonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [everyColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  // função para consultar de dados da api.
  useEffect(() => {
    fetched('https://swapi.dev/api/planets');
  }, []);

  // função para aplicar novo filtro, além de adcionar o novo filtro juntamente com filtros já aplicados, analisar colunas livres para filtragem, e mudar a coluna filtrada como a primeira.
  const filteredNumber = () => {
    const filteredNumberObject = {
      column: columnFilter,
      comparison: compariosonFilter,
      value: valueFilter,
    };
    const currentFilter = [...inputs, filteredNumberObject];
    const freeColumn = everyColumn
      .filter((col) => !currentFilter.some((fil) => fil.column === col));
    setInputs(currentFilter);
    setColumnFilter(freeColumn[0]);
  };

  // função para fazer a filtragem com base nos filtros usados.
  const selectedFilters = (
    everyPlanets,
    filterComparison,
    filterColumn,
    filterValue,
  ) => everyPlanets.filter((planet) => {
    if (filterComparison === 'menor que') {
      return Number(planet[filterColumn]) < Number(filterValue);
    }
    if (filterComparison === 'igual a') {
      return Number(planet[filterColumn]) === Number(filterValue);
    }
    if (filterComparison === 'maior que') {
      return Number(planet[filterColumn]) > Number(filterValue);
    }
    return planet;
  });

  // filtragem dos planetas.
  useEffect(() => {
    const everyPlanets = inputs.reduce((acc, curr) => selectedFilters(
      acc,
      curr.comparison,
      curr.column,
      curr.value,
    ), planets);
    setPlanetsSelected(everyPlanets);
  }, [inputs]);

  const handleClick = () => {
    filteredNumber();
  };

  // caso não tenha uma busca específica todos os planetas serão mostrados, caso contrário, filtra pelo nome.
  useEffect(() => {
    if (searchEntry === '') {
      setPlanetsSelected(planets);
    } else {
      setPlanetsSelected(planets.filter((event) => event.name.toLowerCase()
        .includes(searchEntry)));
    }
  }, [searchEntry, planets]);

  //Remove um filtro
  const removeFilter = (column) => {
    const deletedFilter = inputs.filter((filter) => filter.column !== column);
    setInputs(deletedFilter);
  };

  return (
    
    /*
    componente renderiza:
     seção que inclui o campo de busca e os filtros,
     tabela para renderização dos planetas.
    */
    <>
      <h1>
        Star Wars - Planet Search
      </h1>

      <nav>
        <section
          className="filtersSection"
        >
          <input
            type="text"
            data-testid="name-filter"
            placeholder="Filtrar por nome..."
            value={ searchEntry }
            onChange={ (event) => setSearchEntry(event.target.value) }
            id="name-filter"
          />

          <select
            data-testid="column-filter"
            onChange={ (event) => setColumnFilter(event.target.value) }
            value={ columnFilter }
            id="column-filter"
          >
            {everyColumn.filter((col) => !inputs.some((fil) => fil.column === col))
              .map((col) => <option key={ col } value={ col }>{col}</option>)}
          </select>

          <select
            data-testid="comparison-filter"
            onChange={ (event) => setCompariosonFilter(event.target.value) }
            value={ compariosonFilter }
            id="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>

          <input
            data-testid="value-filter"
            type="number"
            value={ valueFilter }
            onChange={ (event) => setValueFilter(event.target.value) }
            id="value-filter"
          />

          <button
            data-testid="button-filter"
            type="button"
            onClick={ handleClick }
            id="button-filter"
          >
            Filtrar
          </button>
        </section>

        <section>
          <div
            className="apliedFilters"
          >
            {inputs.length > 0 && inputs.map((filters, index) => (
              <div key={ index } data-testid="filter">
                <p key={ filters }>
                  {`${filters.column}
          ${filters.comparison} ${filters.value}`}
                </p>
                <button
                  type="button"
                  onClick={ () => removeFilter(filters.column) }
                >
                  deletar
                </button>
              </div>
            ))}
          </div>

          <button
            className="removeFilters"
            type="button"
            onClick={ () => setInputs([]) }
            data-testid="button-remove-filters"
          >
            Remover todas filtragens
          </button>
        </section>
      </nav>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>

        <tbody>
          { planetsSelected.filter((event) => event.name)
            .map((planet) => (
              <tr key={ planet.name }>
                <td>{ planet.name }</td>
                <td>{ planet.rotation_period}</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films }</td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
