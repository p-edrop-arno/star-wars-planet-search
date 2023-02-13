import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [planetsInfo, setplanetsInfo] = useState([]);
  const [nameFilter, setNameFilter] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const planetsResult = data.results;

      planetsResult.forEach((planet) => delete planet.residents);
      setplanetsInfo(planetsResult);
    };
    fetchApi();
  }, []);

  const states = {
    planetsInfo,
    setplanetsInfo,
    nameFilter,
    setNameFilter,
  };

  return (
    <AppContext.Provider value={ states }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
