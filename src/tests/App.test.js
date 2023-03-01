import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../contexts/PlanetsProvider';
import userEvent from '@testing-library/user-event';
import mockPlanets from './mockPlanets';

describe('Testando se os filtros são funcionam adequadamente no App', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockPlanets),
    }))
    await act(async () => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      );
    })
  })

  test('Filtro - menor que', async () => {
    const filterByNameInput = await screen.findByTestId('name-filter');
    const columnFilterSelect = await screen.findByTestId('column-filter');
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const planetsTable = await screen.findAllByTestId('planet-name');

    expect(filterByNameInput).toBeInTheDocument();
    expect(columnFilterSelect).toBeInTheDocument();
    expect(comparisonFilterSelect).toBeInTheDocument();
    expect(valueFilterInput).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
    expect(planetsTable).toHaveLength(10);

    userEvent.selectOptions(columnFilterSelect, 'diameter');
    userEvent.selectOptions(comparisonFilterSelect, 'menor que');
    userEvent.type(valueFilterInput, '9000');
    userEvent.click(btnFilter);
    const beforePlanetsTableThanLess = await screen.findAllByTestId('planet-name');
    expect(beforePlanetsTableThanLess).toHaveLength(3);
    const btnRemove = screen.getByRole('button', { name: /apagar/i });
    userEvent.click(btnRemove);
    const afterPlanetsTableThanLess = await screen.findAllByTestId('planet-name');
    expect(afterPlanetsTableThanLess).toHaveLength(10);

    userEvent.type(filterByNameInput, 'oo');
    const planetsTableByName = await screen.findAllByTestId('planet-name');
    expect(planetsTableByName).toHaveLength(2);
  });
  test('Filtro - maior que', async () => {
    const filterByNameInput = await screen.findByTestId('name-filter');
    const columnFilterSelect = await screen.findByTestId('column-filter');
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const planetsTable = await screen.findAllByTestId('planet-name');

    userEvent.selectOptions(columnFilterSelect, 'orbital_period');
    userEvent.selectOptions(comparisonFilterSelect, 'maior que');
    userEvent.type(valueFilterInput, '4000');
    userEvent.click(btnFilter);
    const beforePlanetsTableBiggerThen = await screen.findAllByTestId('planet-name');
    expect(beforePlanetsTableBiggerThen).toHaveLength(2);
    const btnRemove = screen.getByRole('button', { name: /apagar/i });
    userEvent.click(btnRemove);
    const afterPlanetsTableBiggerThen = await screen.findAllByTestId('planet-name');
    expect(afterPlanetsTableBiggerThen).toHaveLength(10);
  })
  test('Filtro - igual a', async () => {
    const filterByNameInput = await screen.findByTestId('name-filter');
    const columnFilterSelect = await screen.findByTestId('column-filter');
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const planetsTable = await screen.findAllByTestId('planet-name');

    userEvent.selectOptions(columnFilterSelect, 'rotation_period');
    userEvent.selectOptions(comparisonFilterSelect, 'igual a');
    userEvent.type(valueFilterInput, '23');
    userEvent.click(btnFilter);
    const beforePlanetsTableEqual = await screen.findAllByTestId('planet-name');
    expect(beforePlanetsTableEqual).toHaveLength(3);
    const btnRemove = screen.getByRole('button', { name: /apagar/i });
    userEvent.click(btnRemove);

    const afterPlanetsTableEqual = await screen.findAllByTestId('planet-name');
    expect(afterPlanetsTableEqual).toHaveLength(10);

    // Testando se o botão de remover todos os filtros funciona.

    userEvent.selectOptions(columnFilterSelect, 'rotation_period');
    userEvent.selectOptions(comparisonFilterSelect, 'igual a');
    userEvent.type(valueFilterInput, '23');
    userEvent.click(btnFilter);

    userEvent.selectOptions(columnFilterSelect, 'orbital_period');
    userEvent.selectOptions(comparisonFilterSelect, 'maior que');
    userEvent.type(valueFilterInput, '4000');
    userEvent.click(btnFilter);

    const removeAllFilters = screen.getByRole('button', { name: /remover filtros/i })
    userEvent.click(removeAllFilters);
    const allPlanetsTable = await screen.findAllByTestId('planet-name');
    expect(allPlanetsTable).toHaveLength(10);

  })
});
