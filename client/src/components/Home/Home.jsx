import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  console.log(":::: pokemons", pokemons);

  //es un hook de react q sirve para ejecutar codigo en
  //algun momento del ciclo de vida de un componente de react.
  //este se ejecuta cada vez q cambia el valor de alguna depencia pasada
  //a traves del array de dependencias. si el array de dependencia esta
  //vacio se eject por unica vez cuando el comp es montado
  useEffect(() => {
    const getPokemons = async () => {
      const { data } = await axios(`http://localhost:3001/pokemons`);
      console.log("::: data", data);
      setPokemons(data);
    };
    getPokemons();
  }, []);

  return (
    <>
      <h1>Home</h1>
      {pokemons.map((pokemon) => {
        return <h2>{pokemon.name}</h2>;
      })}
    </>
  );
};

export default Home;
