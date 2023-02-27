import React from 'react';
import './App.css';
import Table from './components/Table';
// import PlanetsContext from './contexts/PlanetsContext';

function App() {
  // const { planets, setPlanets } = useContext(PlanetsContext);
  // useEffect(() => {
  //   fetch('https://swapi.dev/api/planets')
  //     .then((response) => response.json())
  //     .then((data) => setPlanets(data.results));
  // }, []);
  // planets.map((planet) => delete planet.residents);
  return (
    <Table />
  );
}

export default App;
