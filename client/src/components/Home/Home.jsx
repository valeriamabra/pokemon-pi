import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Home.module.css";
import { Link, useParams } from "react-router-dom";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pages, setPages] = useState([]);
  const { page } = useParams();
  console.log(":::::", page);

  //es un hook de react q sirve para ejecutar codigo en
  //algun momento del ciclo de vida de un componente de react.
  //este se ejecuta cada vez q cambia el valor de alguna depencia pasada
  //a traves del array de dependencias. si el array de dependencia esta
  //vacio se eject por unica vez cuando el comp es montado
  useEffect(() => {
    const getPokemons = async () => {
      try {
        //me traigo los pokemons de la api y los guardo en pokemons
        const response = await axios.get("http://localhost:3001/pokemons");
        setPokemons(response.data);

        // PAGINADO
        //ARRAY DE ARRAYS
        // [
        // 	[
        // 		{ name: "pepe", ... },
        // 		{ name: "trueno", ... },
        // 		{ name: "gary", ... },
        // 	],
        // 	[
        // 		{ name: "sr affleck", ... },
        // 		{ name: "vale", ... },
        // 		{ name: "marilyn", ... },
        // 	],
        // 	[
        // 		{ name: "lucre", ... },
        // 		{ name: "pipo", ... },
        // 		{ name: "valerie", ... },
        // 	]
        // ]
        const pagesArray = response.data.reduce((resultArray, item, index) => {
          const chunkIndex = Math.floor(index / 12);

          if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
          }

          resultArray[chunkIndex].push(item);

          return resultArray;
        }, []);

        setPages(pagesArray);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };
    getPokemons();
  }, []);

  // console.log(pokemons);

  const [name, setName] = useState("");

  const onNameChaged = (evento) => {
    setName(evento.target.value);
  };

  return (
    <>
      <h1 className={styles.title}>Home</h1>
      <div className={styles.searchBarContainer}>
        <input
          onChange={onNameChaged}
          placeholder="Ingrese un nombre"
          value={name}
        ></input>
        <button>Buscar</button>
        <select>
          <option>Filtar por orden</option>
          <option>Ascendente</option>
          <option>Descendente</option>
        </select>
        <select>
          <option>Filtar por origen</option>
          <option>Api</option>
          <option>DB</option>
        </select>
      </div>
      <div className={styles.cardsContainer}>
        {pages[page || 0]?.map((pokemon) => (
          <Card
            key={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        ))}
      </div>
      <ul>
        {
          //map: por cada elemt del array ejecuta la funcion q le pasamos
          pages?.map((page, index) => {
            return (
              <li>
                <Link
                  params={{ page: index }}
                  to={`/home/${index}`}
                  key={index}
                >
                  {index + 1}
                </Link>
              </li>
            );
          })
        }
      </ul>
    </>
  );
};

export default Home;
