import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const { fetched, loading, errors, planets } = useFetch();

  const content = useMemo(() => ({
    errors, loading, fetched, planets,
  }), [errors, loading, fetched, planets]);

  return (
    <AppContext.Provider value={ content }>
      { children }
    </AppContext.Provider>
  );
}
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppProvider;
