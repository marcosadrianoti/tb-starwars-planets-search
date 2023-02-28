import React, { useContext } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

function FilteringByName() {
  const { filterByName, setFilterByName } = useContext(PlanetsContext);
  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ filterByName }
        id="filterByName"
        onChange={ ({ target }) => setFilterByName(target.value) }
      />
    </div>
  );
}

export default FilteringByName;
