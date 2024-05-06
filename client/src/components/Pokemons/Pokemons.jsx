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
//ARRAY DE ARRAYS
// [
// 	[
// 		{ name: "pepe", ... },
// 	],
// ]
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

const Pokemons = () => {
  const dispatch = useDispatch();

  // el useSelector es un hook de redux que sirve para traer
  // una porcion del state a nuestro componente
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const page = useSelector((state) => state.page);

  // state local react
  //crear estados dentro del componente local
  const [pages, setPages] = useState([]); //aca se guardan los pokemons paginados
  const [order, setOrder] = useState(""); //filtro de ordenar
  const [origen, setOrigen] = useState(""); //filtro de origen
  const [type, setType] = useState(""); //filtro de tipo
  const [name, setName] = useState(""); //el buscar x nombre

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
  }, [pokemons, order, origen, type]); //

  const onBuscar = async () => {
    if (name) {
      dispatch(searchPokemon(name));
      return;
    }
    dispatch(fetchPokemons());
  };

  //estas funciones se encargan de ir modificando el estado
  //conforme el usuario va cambiando el select
  const onNameChaged = (evento) => {
    setName(evento.target.value);
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
            origin={pokemon.origin}
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
                className={styles.paginadoButton}
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
