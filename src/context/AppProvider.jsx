import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useFetch from '../hooks/useFetch';

// função para usar o hook useFetch para coletar os dados da api.
function AppProvider({ children }) {
  const { fetched, loading, errors, planets } = useFetch();

  // o hook useMemo, para guardar as informações de erros, loading, fetched, e planets, usados para construir o content
  const content = useMemo(() => ({
    errors, loading, fetched, planets,
  }), [errors, loading, fetched, planets]);

  return (

    // AppContext.Provider recebe o content como valor do objeto, o conteúdo é fornecido pelo context.
    <AppContext.Provider value={ content }>
      { children }
    </AppContext.Provider>
  );
}
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppProvider;
