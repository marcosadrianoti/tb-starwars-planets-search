import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  // const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);
  const [filterByName, setFilterByName] = useState('');

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
      // Remove a propriedade residents de cada planeta
        data.results.map((planet) => delete planet.residents);
        setPlanets(data.results);

        // Obtém as chaves do primeiro planeta do array para compor o cabeçalho da tabela.
        const headerKeys = Object.keys(data.results[0]);
        setTableHeader(headerKeys);
        // setFilteredPlanets(planets);
      })
      .catch((error) => {
        console.error(error);
      });
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
  }), [planets, tableHeader, filterByName]);

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
