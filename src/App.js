import React from 'react';
import './App.css';
import Table from './components/Table';
import FilteringByName from './components/FilteringByName';

function App() {
  return (
    <div>
      <FilteringByName />
      <Table />
    </div>
  );
}

export default App;
