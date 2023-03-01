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
    // .catch((error) => {
    //   console.error(error);
    // });
  }, []);

  const values = useMemo(() => ({
    planets,
    setPlanets,
    tableHeader,
    setTableHeader,
    filterByName,
    setFilterByName,
    // filteredPlanets,
    // setFilteredPlanets,
    filterByColumns,
    addFilter,
    columnsFilter,
    setColumnsFilter,
  }), [planets, tableHeader, filterByName, addFilter, filterByColumns, columnsFilter]);

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
