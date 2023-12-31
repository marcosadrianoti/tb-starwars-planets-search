import PropTypes from 'prop-types';
import { useState, useEffect, useMemo, useCallback } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByColumns, setFilterByColumns] = useState([]);
  const [columnsFilter, setColumnsFilter] = useState([
    'population', 'orbital_period', 'diameter', 'surface_water', 'rotation_period',
  ]);

  const addFilter = useCallback((filter) => {
    setFilterByColumns([...filterByColumns, filter]);
  }, [filterByColumns, setFilterByColumns]);

  const removeFilter = useCallback((columnFilter) => {
    const index = filterByColumns.findIndex((filter) => filter.column === columnFilter);
    filterByColumns.splice(index, 1);
    setFilterByColumns([...filterByColumns]);
    setColumnsFilter([...columnsFilter, columnFilter]);
  }, [filterByColumns, columnsFilter, setFilterByColumns, setColumnsFilter]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
      // Remove a propriedade "residents" de cada planeta
        data.results.map((planet) => delete planet.residents);
        setPlanets(data.results);

        // Obtém as chaves do primeiro planeta do array para compor o cabeçalho da tabela.
        const headerKeys = Object.keys(data.results[0]);
        setTableHeader(headerKeys);
      });
  }, []);

  const values = useMemo(() => ({
    planets,
    setPlanets,
    tableHeader,
    setTableHeader,
    filterByName,
    setFilterByName,
    setFilterByColumns,
    filterByColumns,
    addFilter,
    removeFilter,
    columnsFilter,
    setColumnsFilter,
  }), [
    planets,
    tableHeader, filterByName, addFilter, removeFilter, filterByColumns, columnsFilter]);

  return (
    <PlanetsContext.Provider value={ values }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
