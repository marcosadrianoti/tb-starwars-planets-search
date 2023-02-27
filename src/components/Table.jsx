import React, { useContext } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';
import TableHeaderContext from '../contexts/TableHeaderContext';

function Table() {
  const { planets } = useContext(PlanetsContext);
  const { tableHeader } = useContext(TableHeaderContext);
  return (
    <table>
      <thead>
        <tr>
          {tableHeader.map((header) => (
            <th key={ header }>{ header }</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {
          planets.map((data) => (
            <tr key={ data[tableHeader[0]] }>
              <td>{ data[tableHeader[0]] }</td>
              <td>{ data[tableHeader[1]] }</td>
              <td>{ data[tableHeader[2]] }</td>
              <td>{ data[tableHeader[3]] }</td>
              <td>{ data[tableHeader[4]] }</td>
              <td>{ data[tableHeader[5]] }</td>
              <td>{ data[tableHeader[6]] }</td>
              <td>{ data[tableHeader[7]] }</td>
              <td>{ data[tableHeader[8]] }</td>
              <td>{ data[tableHeader[9]] }</td>
              <td>{ data[tableHeader[10]] }</td>
              <td>{ data[tableHeader[11]] }</td>
              <td>{ data[tableHeader[12]] }</td>
            </tr>))
        }
      </tbody>
    </table>
  );
}

export default Table;
