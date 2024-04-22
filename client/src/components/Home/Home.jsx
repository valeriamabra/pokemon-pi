import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Home.module.css";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const response = await axios.get("http://localhost:3001/pokemons");
        setPokemons(response.data);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };
    getPokemons();
  }, []);

  console.log(pokemons);

  return (
    <>
      <h1 className={styles.title}>Home</h1>
      <div className={styles.cardsContainer}>
        {pokemons?.map((pokemon) => (
          <Card
            key={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        ))}
      </div>
    </>
  );
};

export default Home;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Card from "../Card/Card";

// const Home = () => {
//   const [pokemons, setPokemons] = useState([]);
//   console.log(":::: pokemons", pokemons);

//   //es un hook de react q sirve para ejecutar codigo en
//   //algun momento del ciclo de vida de un componente de react.
//   //este se ejecuta cada vez q cambia el valor de alguna depencia pasada
//   //a traves del array de dependencias. si el array de dependencia esta
//   //vacio se eject por unica vez cuando el comp es montado
//   useEffect(() => {
//     const getPokemons = async () => {
//       const { data } = await axios(`http://localhost:3001/pokemons`);
//       console.log("::: data", data);
//       setPokemons(data);
//     };
//     getPokemons();
//   }, []);

//   return (
//     <>
//       <h1>Home</h1>
//       {pokemons?.api?.map((pokemon) => {
//         return <Card />;
//       })}
//     </>
//   );
// };

// export default Home;
