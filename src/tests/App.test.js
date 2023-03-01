import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../contexts/PlanetsProvider';
import userEvent from '@testing-library/user-event';
import mockPlanets from './mockPlanets';

describe('Testando App', () => {
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

  test('menor que', async () => {
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
    const planetsTableThanLess = await screen.findAllByTestId('planet-name');
    expect(planetsTableThanLess).toHaveLength(3);

    userEvent.type(filterByNameInput, 'oo');
    const planetsTableByName = await screen.findAllByTestId('planet-name');
    expect(planetsTableByName).toHaveLength(2);
  });
  test('maior que', async () => {
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

    userEvent.selectOptions(columnFilterSelect, 'orbital_period');
    userEvent.selectOptions(comparisonFilterSelect, 'maior que');
    userEvent.type(valueFilterInput, '4000');
    userEvent.click(btnFilter);
    const planetsTableBiggerThen = await screen.findAllByTestId('planet-name');
    expect(planetsTableBiggerThen).toHaveLength(2);
  })
  test('igual a', async () => {
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

    userEvent.selectOptions(columnFilterSelect, 'rotation_period');
    userEvent.selectOptions(comparisonFilterSelect, 'igual a');
    userEvent.type(valueFilterInput, '23');
    userEvent.click(btnFilter);
    const planetsTableBiggerThen = await screen.findAllByTestId('planet-name');
    expect(planetsTableBiggerThen).toHaveLength(3);
  })
});
