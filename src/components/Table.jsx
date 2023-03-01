import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

function Table() {
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [localFilterByColumn, setLocalFilterByColumn] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const {
    planets,
    // filteredPlanets,
    // setFilteredPlanets,
    tableHeader,
    filterByName,
    // setFilterByName,
    // filterByColumns,
    addFilter,
  } = useContext(PlanetsContext);

  useEffect(() => {
    if (filterByName === '') {
      setFilteredPlanets(planets);
    } else {
      const name = filterByName.toLowerCase();
      const filteredByName = planets
        .filter((planet) => planet.name.toLowerCase().includes(name));
      setFilteredPlanets(filteredByName);
    }
  }, [filterByName, planets]);

  const handleClick = () => {
    addFilter(localFilterByColumn);
    const numericFilteredPlanets = filteredPlanets.filter((planet) => {
      switch (localFilterByColumn.comparison) {
      case 'maior que':
        return (
          Number(planet[localFilterByColumn.column]) > Number(localFilterByColumn.value)
        );
      case 'menor que':
        return (
          Number(planet[localFilterByColumn.column]) < Number(localFilterByColumn.value)
        );
      case 'igual a':
        return (
          Number(planet[localFilterByColumn.column]) === Number(localFilterByColumn.value)
        );

      default:
        return false;
      }
    });
    setFilteredPlanets(numericFilteredPlanets);
  };

  return (
    <>
      <div>
        <div className="">
          <label data-shrink="true" id="" htmlFor="column">
            Coluna
          </label>
          <select
            name="column"
            data-testid="column-filter"
            onChange={ (e) => setLocalFilterByColumn(
              { ...localFilterByColumn, column: e.target.value },
            ) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="surface_water">surface_water</option>
            <option value="rotation_period">rotation_period</option>
          </select>
        </div>
        <div className="">
          <label data-shrink="true" id="" htmlFor="comparison">
            Operador
          </label>
          <select
            name="comparison"
            data-testid="comparison-filter"
            onChange={ (e) => setLocalFilterByColumn(
              { ...localFilterByColumn, comparison: e.target.value },
            ) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </div>
        <div className="">
          <div className="">
            <input
              name="value"
              type="number"
              data-testid="value-filter"
              className=""
              value={ localFilterByColumn.value }
              id=""
              onChange={ (e) => setLocalFilterByColumn(
                { ...localFilterByColumn, value: e.target.value },
              ) }
            />
          </div>
        </div>
        <button
          className=""
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {tableHeader.map((header) => (
              <th key={ header }>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets
            .map((data) => (
              <tr key={ data[tableHeader[0]] }>
                <td data-testid="planet-name">{data[tableHeader[0]]}</td>
                <td>{data[tableHeader[1]]}</td>
                <td>{data[tableHeader[2]]}</td>
                <td>{data[tableHeader[3]]}</td>
                <td>{data[tableHeader[4]]}</td>
                <td>{data[tableHeader[5]]}</td>
                <td>{data[tableHeader[6]]}</td>
                <td>{data[tableHeader[7]]}</td>
                <td>{data[tableHeader[8]]}</td>
                <td>{data[tableHeader[9]]}</td>
                <td>{data[tableHeader[10]]}</td>
                <td>{data[tableHeader[11]]}</td>
                <td>{data[tableHeader[12]]}</td>
              </tr>))}
        </tbody>
      </table>

    </>
  );
}

export default Table;
