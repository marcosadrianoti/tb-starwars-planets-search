import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import PlanetsContext from './PlanetsContext';
import TableHeaderContext from './TableHeaderContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const { setTableHeader } = useContext(TableHeaderContext);
  // const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
      // Remove a propriedade residents de cada planeta
        data.results.map((planet) => delete planet.residents);

        // Atualiza o estado com os planetas sem a propriedade residents
        setPlanets(data.results);

        // Obtém as chaves do primeiro planeta do array para compor o cabeçalho da tabela.
        const teste = Object.keys(data.results[0]);
        setTableHeader(teste);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets, setPlanets } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.shape([]).isRequired,
};

export default PlanetsProvider;
