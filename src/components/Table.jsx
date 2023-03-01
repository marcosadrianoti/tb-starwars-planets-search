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
    tableHeader,
    filterByName,
    filterByColumns,
    setFilterByColumns,
    addFilter,
    removeFilter,
    columnsFilter,
    setColumnsFilter,
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

  const toFilter = () => {
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
          Number(planet[localFilterByColumn
            .column]) === Number(localFilterByColumn.value)
        );

      default:
        return false;
      }
    });
    setFilteredPlanets(numericFilteredPlanets);
    const newListOptions = columnsFilter
      .filter((opt) => opt !== localFilterByColumn.column);
    setColumnsFilter(newListOptions);
    setLocalFilterByColumn({ ...localFilterByColumn, column: newListOptions[0] });
  };

  const handleClick = (e) => {
    const clickedBtn = e.target.innerHTML;
    if (clickedBtn === 'Filtrar') {
      toFilter();
    } else if (clickedBtn === 'Remover Filtros') {
      setFilterByColumns([]);
      setColumnsFilter([
        'population', 'orbital_period', 'diameter', 'surface_water', 'rotation_period',
      ]);
      setFilteredPlanets(planets);
    } else if (clickedBtn === 'Apagar') {
      const nameFilter = e.target.value;
      removeFilter(nameFilter);
      setFilteredPlanets([...planets]);
      filterByColumns.forEach((filter) => {
        const numericFilteredPlanets = planets.filter((planet) => {
          switch (filter.comparison) {
          case 'maior que':
            return (
              Number(planet[filter.column]) > Number(filter.value)
            );
          case 'menor que':
            return (
              Number(planet[filter.column]) < Number(filter.value)
            );
          case 'igual a':
            return (
              Number(planet[filter
                .column]) === Number(filter.value)
            );
          default:
            return false;
          }
        });
        setFilteredPlanets(numericFilteredPlanets);
      });
    }
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
            {columnsFilter
              .map((column) => <option key={ column } value={ column }>{column}</option>)}
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
        <button
          className=""
          type="button"
          data-testid="button-remove-filters"
          onClick={ handleClick }
        >
          Remover Filtros
        </button>
      </div>
      { filterByColumns
        .map((filter, index) => (
          <div key={ index } data-testid="filter">
            <span>
              {filter.column}
              {' - '}
              {filter.comparison}
              {' - '}
              {filter.value}
              {' '}
            </span>
            <button
              className=""
              value={ filter.column }
              type="button"
              onClick={ handleClick }
            >
              Apagar
            </button>
          </div>))}
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
