import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import mockFetch from '../../cypress/mocks/fetch';
import App from '../App';
import AppProvider from '../context/AppProvider';

const renderWithContext = (component) => ({
  ...render(
    <AppProvider>
      {component}
    </AppProvider>,
  ),
});

describe('test application', () => {
  afterEach(() => jest.clearAllMocks());
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = mockFetch;
    renderWithContext(<App />);
  });

  test('all the components renders', async () => {
    const tableOfPlanets = await screen.getByRole('table');
    expect(tableOfPlanets).toBeInTheDocument();

    const entryText = await screen.findByTestId('name-filter');
    expect(entryText).toBeInTheDocument();

    const selectColumn = await screen.findByTestId('column-filter');
    expect(selectColumn).toBeInTheDocument();

    const selectComparison = await screen.findByTestId('comparison-filter');
    expect(selectComparison).toBeInTheDocument();

    const valueEntry = await screen.findByTestId('value-filter');
    expect(valueEntry).toBeInTheDocument();

    const buttonFilter = await screen.getByRole(
      'button',
      {
        name: /filtrar/i,
      },
    );
    expect(buttonFilter).toBeInTheDocument();
  });

  test('the text filter work', async () => {
    const entryText = await screen.findByTestId('name-filter');
    userEvent.type(entryText, 'aa');
  });

  test('the numbers filters work', async () => {
    const selectColumn = await screen.findByTestId('column-filter');
    const selectComparison = await screen.findByTestId('comparison-filter');
    const valueEntry = await screen.findByTestId('value-filter');
    const buttonFilter = await screen.getByRole(
      'button',
      {
        name: /filtrar/i,
      },
    );

    userEvent.selectOptions(selectColumn, 'population');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.type(valueEntry, '900');
    userEvent.click(buttonFilter);

    const firstFilter = await screen.findByTestId('filter');

    userEvent.click(firstFilter.children[1]);
    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectComparison, 'maior que');
    userEvent.type(valueEntry, '3000');
    userEvent.click(buttonFilter);

    const secondFilter = await screen.findByTestId('filter');

    userEvent.click(secondFilter.children[1]);
    userEvent.selectOptions(selectColumn, 'orbital_period');
    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.type(valueEntry, '7500');
    userEvent.click(buttonFilter);

    const thirdFilter = await screen.findByTestId('filter');

    userEvent.click(thirdFilter.children[1]);
  });
});
