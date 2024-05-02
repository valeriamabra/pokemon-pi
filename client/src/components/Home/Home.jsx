import { useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPokemons,
  fetchTypes,
  searchPokemon,
  setPage,
} from "../../redux/actions/action";

const getPages = (data) => {
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
  return data.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 12);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
};

const Home = () => {
  const dispatch = useDispatch();

  // el useSelector es un hook de redux que sirve para traernos
  // una porcion del state
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const page = useSelector((state) => state.page);

  // state local
  const [pages, setPages] = useState([]);
  const [order, setOrder] = useState("");
  const [origen, setOrigen] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    let orderedPokemons = [...pokemons];
    if (order !== "") {
      orderedPokemons = orderedPokemons.sort((a, b) => {
        if (order === "A")
          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;
      });
    }

    orderedPokemons = orderedPokemons.filter((pokemon) => {
      if (origen === "") return true;
      return pokemon.origin === origen;
    });

    orderedPokemons = orderedPokemons.filter((pokemon) => {
      if (type === "") return true;
      return pokemon.types.includes(type);
    });

    console.log(orderedPokemons);

    setPages(getPages(orderedPokemons));
  }, [pokemons, order, origen, type]);

  //es un hook de react q sirve para ejecutar codigo en
  //algun momento del ciclo de vida de un componente de react.
  //este se ejecuta cada vez q cambia el valor de alguna depencia pasada
  //a traves del array de dependencias. si el array de dependencia esta
  //vacio se eject por unica vez cuando el comp es montado
  // /!lo usamos para traernos todos los pokemons!/;

  useEffect(() => {
    // despachamos un action creator
    dispatch(fetchPokemons());
    dispatch(fetchTypes());
  }, []);

  const onNameChaged = (evento) => {
    setName(evento.target.value);
  };

  const onBuscar = async () => {
    if (name) {
      dispatch(searchPokemon(name));
      return;
    }
    dispatch(fetchPokemons());
  };

  const setOrdenar = (evento) => {
    setOrder(evento.target.value);
  };

  const setFiltrarOrigen = (evento) => {
    setOrigen(evento.target.value);
  };

  const setFiltrarType = (evento) => {
    setType(evento.target.value);
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
        <button onClick={onBuscar}>Buscar</button>
        {/* cuando el usuario cambia el select se ejecuta la funcion setOrdenar (recibida a traves de la
        prop onChange) */}
        <select onChange={setOrdenar}>
          <option value="">Ordenar</option>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>
        <select onChange={setFiltrarOrigen}>
          <option value="">Origen</option>
          <option value="API">Api</option>
          <option value="DB">DB</option>
        </select>
        <select onChange={setFiltrarType}>
          <option value="">Type</option>
          {types.map((type) => {
            return (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.cardsContainer}>
        {/* recorro el array pages en el indice(router /0) page */}
        {pages[page]?.map((pokemon) => (
          <Card
            id={pokemon.id}
            key={pokemon.id + pokemon.name}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        ))}
      </div>
      <div className={styles.paginado}>
        {
          //map: por cada elemt del array ejecuta la funcion q le pasamos
          //recorro las pages y por cada una armo un boton
          pages?.map((page, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setPage(index);
                  dispatch(setPage(index));
                }}
              >
                {index + 1}
              </button>
            );
          })
        }
      </div>
    </>
  );
};

export default Home;
