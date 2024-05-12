import { useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./Pokemons.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPokemons,
  fetchTypes,
  searchPokemon,
  setPage,
} from "../../redux/actions/action";

const getPages = (data) => {
  // ARRAY DE ARRAYS
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

const Pokemons = () => {
  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const page = useSelector((state) => state.page);

  const [pages, setPages] = useState([]);
  const [order, setOrder] = useState("");
  const [origen, setOrigen] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(fetchPokemons());
    dispatch(fetchTypes());
  }, []);

  useEffect(() => {
    let orderedPokemons = [...pokemons];

    if (order !== "") {
      orderedPokemons = orderedPokemons.sort((a, b) => {
        if (order === "A")
          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;
      });
    }

    if (origen !== "") {
      orderedPokemons = orderedPokemons.filter((pokemon) => {
        return pokemon.origin === origen;
      });
    }

    if (type !== "") {
      orderedPokemons = orderedPokemons.filter((pokemon) => {
        return pokemon.types.includes(type);
      });
    }
    const paginado = getPages(orderedPokemons);
    setPages(paginado);
  }, [pokemons, order, origen, type]);

  const onBuscar = async () => {
    if (name) {
      dispatch(searchPokemon(name));
      return;
    }
    dispatch(fetchPokemons());
  };

  const onNameChaged = (evento) => {
    setName(evento.target.value);
  };

  const setOrdenar = (evento) => {
    setOrder(evento.target.value);
  };

  const setFiltrarOrigen = (evento) => {
    dispatch(setPage(0));
    setOrigen(evento.target.value);
  };

  const setFiltrarType = (evento) => {
    dispatch(setPage(0));
    setType(evento.target.value);
  };

  return (
    <>
      <div className={styles.searchBarContainer}>
        <input
          onChange={onNameChaged}
          placeholder="Ingrese un nombre"
          value={name}
        ></input>
        <button onClick={onBuscar}>Buscar</button>
      </div>
      <div className={styles.searchBarContainer}>
        <select className={styles.filterSelect} onChange={setOrdenar}>
          <option value="">Ordenar</option>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>
        <select className={styles.filterSelect} onChange={setFiltrarOrigen}>
          <option value="">Origen</option>
          <option value="API">Api</option>
          <option value="DB">DB</option>
        </select>
        <select className={styles.filterSelect} onChange={setFiltrarType}>
          <option value="">Type</option>
          {/* renderizo los tipos */}
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
        {/* recorro la pag seleccionada x el usuario y muestro los pokemons de dicha pagina*/}
        {pages[page]?.map((pokemon) => (
          <Card
            id={pokemon.id}
            key={pokemon.id + pokemon.name}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
            origin={pokemon.origin}
          />
        ))}
      </div>
      <div className={styles.paginado}>
        {
          // recorro un array de paginas
          //por cada pag renderizo un boton
          pages?.map((_, index) => {
            return (
              <button
                className={
                  page === index
                    ? styles.paginadoButtonPressed
                    : styles.paginadoButton
                }
                key={index}
                onClick={() => {
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

export default Pokemons;
