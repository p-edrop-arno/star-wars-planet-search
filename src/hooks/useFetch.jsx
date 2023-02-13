import { useState } from 'react';

function useFetch() {
  const [planets, setPlanets] = useState([]);
  const [loading, setloading] = useState(false);
  const [errors, setErros] = useState(null);

  const fetched = async (url) => {
    setloading(true);
    try {
      const promisse = await fetch(url);
      const response = await promisse.json();

      response.results.map((planet) => {
        delete planet.residents;
        return planet;
      });

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
