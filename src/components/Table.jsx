import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const { planets, fetched } = useContext(AppContext);
  const [planetsSelected, setPlanetsSelected] = useState([]);
  const [searchEntry, setSearchEntry] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [compariosonFilter, setCompariosonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    fetched('https://swapi.dev/api/planets');
  }, []);

  const filteredNumber = () => {
    const filteredNumberObject = {
      column: columnFilter,
      comparison: compariosonFilter,
      value: valueFilter,
    };
    setInputs([...inputs, filteredNumberObject]);
  };

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

  useEffect(() => {
    if (searchEntry === '') {
      setPlanetsSelected(planets);
    } else {
      setPlanetsSelected(planets.filter((event) => event.name.toLowerCase()
        .includes(searchEntry)));
    }
  }, [searchEntry, planets]);

  return (
    <>
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
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
