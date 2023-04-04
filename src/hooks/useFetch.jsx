import { useState } from 'react';

// função para definir o hook useFetch para gerenciar estados funcionais.
function useFetch() {
  const [planets, setPlanets] = useState([]);
  const [loading, setloading] = useState(false);
  const [errors, setErros] = useState(null);

  // função assíncrona, para fazer um solicitação a url da api e esperar a promisse, com a resposta em json.
  const fetched = async (url) => {
    setloading(true);
    try {
      const promisse = await fetch(url);
      const response = await promisse.json();

      response.results.map((planet) => {
        delete planet.residents;
        return planet;
      });

      // definindo o estado de planets com o resultado da solicitação e definindo um erro.
      setPlanets(response.results);
    } catch (error) {
      setErros(error.message);
    }
  };

  return {
    errors, loading, fetched, planets,
  };
}

export default useFetch;
