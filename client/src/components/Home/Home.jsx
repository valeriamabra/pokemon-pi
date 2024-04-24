import { useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPokemons,
  searchPokemon,
  setPage,
} from "../../redux/actions/action";

const Home = () => {
  const dispatch = useDispatch();

  const pages = useSelector((state) => state.pages);
  const page = useSelector((state) => state.page);

  //es un hook de react q sirve para ejecutar codigo en
  //algun momento del ciclo de vida de un componente de react.
  //este se ejecuta cada vez q cambia el valor de alguna depencia pasada
  //a traves del array de dependencias. si el array de dependencia esta
  //vacio se eject por unica vez cuando el comp es montado
  // /!lo usamos para traernos todos los pokemons!/;

  useEffect(() => {
    dispatch(fetchPokemons());
  }, []);

  const [name, setName] = useState("");

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

  const ordenar = (evento) => {
    console.log(evento.target.value);
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
        <select onChange={ordenar}>
          <option value="">Ordenar</option>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>
        <select>
          <option>Origen</option>
          <option>Api</option>
          <option>DB</option>
        </select>
      </div>
      <div className={styles.cardsContainer}>
        {/* recorro el array pages en el indice(router /0) page */}
        {pages[page]?.map((pokemon) => (
          <Card
            key={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        ))}
      </div>
      <div>
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
