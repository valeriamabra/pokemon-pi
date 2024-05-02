import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonById } from "../../redux/actions/action";
import styles from "../Detail/Detail.module.css";
import Card from "../Card/Card";

import { useEffect } from "react";
const Detail = () => {
  let { id } = useParams();
  const pokemon = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPokemonById(id));
  }, [dispatch, fetchPokemonById]);

  return (
    <>
      {pokemon && (
        <div className={styles.container}>
          <h1>{pokemon.name}</h1>

          <img src={pokemon.image} alt={pokemon.name} />

          <div className={styles.datasContainer}>
            <div className={styles.dataContainer}>
              <label>ID: </label>
              <span>{pokemon.id}</span>
            </div>

            <div className={styles.dataContainer}>
              <label>VIDA: </label>
              <span>{pokemon.hp}</span>
            </div>

            <div className={styles.dataContainer}>
              <label>DEFENSA: </label>
              <span>{pokemon.defense}</span>
            </div>

            <div className={styles.dataContainer}>
              <label>ATAQUE: </label>
              <span>{pokemon.attack}</span>
            </div>

            {pokemon.speed && (
              <div className={styles.dataContainer}>
                <label>VELOCIDAD: </label>
                <span>{pokemon.speed}</span>
              </div>
            )}

            {pokemon.height && (
              <div className={styles.dataContainer}>
                <label>ALTURA: </label>
                <span>{pokemon.height}</span>
              </div>
            )}

            {pokemon.weight && (
              <div className={styles.dataContainer}>
                <label>PESO: </label>
                <span>{pokemon.weight}</span>
              </div>
            )}

            <div className={styles.dataContainer}>
              <label>TIPO: </label>
              {pokemon &&
                pokemon.types &&
                pokemon.types.map((type, index) => (
                  <span key={index}>{type}</span>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
