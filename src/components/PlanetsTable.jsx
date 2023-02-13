import { useContext } from 'react';
import AppContext from '../context/AppContext';

function PlanetsTable() {
  const { planetsInfo, nameFilter, setNameFilter } = useContext(AppContext);

  return (
    <>
      <label htmlFor="name-filter">
        <input
          data-testid="name-filter"
          placeholder="enter planet name"
          type="text"
          name="name-filter"
          value={ nameFilter }
          onChange={ (event) => {
            setNameFilter(event.target.value);
          } }
        />
      </label>

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
          {planetsInfo.filter((planet) => planet.name.includes(nameFilter))
            .map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
export default PlanetsTable;
