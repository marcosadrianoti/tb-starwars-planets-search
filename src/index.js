import React from 'react';
import ReactDOM from 'react-dom/client';
import PlanetsProvider from './contexts/PlanetsProvider';
import App from './App';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>,
  );
