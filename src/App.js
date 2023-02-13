import React from 'react';
import './App.css';
import PlanetsTable from './components/PlanetsTable';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <PlanetsTable />
    </AppProvider>

  );
}

export default App;
