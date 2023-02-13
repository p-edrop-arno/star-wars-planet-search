import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [planetsInfo, setplanetsInfo] = useState([]);

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

  const infos = {
    planetsInfo,
    setplanetsInfo,
  };

  return (
    <AppContext.Provider value={ infos }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
