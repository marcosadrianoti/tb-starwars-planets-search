import React from 'react';
import ReactDOM from 'react-dom/client';
import PlanetsProvider from './contexts/PlanetsProvider';
import TableHeaderProvider from './contexts/TableHeaderProvider';
import App from './App';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <TableHeaderProvider>
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    </TableHeaderProvider>,
  );
