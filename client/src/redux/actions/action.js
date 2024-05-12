import axios from "axios";
import {
  SET_PAGE,
  ADD_POKEMONS,
  SEARCH_POKEMON,
  ADD_TYPES,
  SAVE_POKEMON,
  ADD_POKEMON_BY_ID,
} from "./types";

export const fetchPokemons = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/pokemons");

      return dispatch({
        type: ADD_POKEMONS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTypes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: ADD_TYPES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchPokemon = (name) => {
  return async (dispatch) => {
    const { data } = await axios.get(`http://localhost:3001/pokemons/${name}`);

    if (data.length === 0) {
      alert("Pokemon no encontrado");
      return;
    }

    return dispatch({
      type: SEARCH_POKEMON,
      payload: data,
    });
  };
};

export const fetchPokemonById = (origin, id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/pokemons/${origin}/${id}`
      );
      return dispatch({
        type: ADD_POKEMON_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const savePokemon = (pokemon) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/pokemons`,
        pokemon
      );
      return dispatch({
        type: SAVE_POKEMON,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setPage = (index) => {
  return {
    type: SET_PAGE,
    payload: index,
  };
};
