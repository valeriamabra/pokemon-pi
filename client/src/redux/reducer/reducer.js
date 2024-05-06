import {
  SET_PAGE,
  ADD_POKEMONS,
  SEARCH_POKEMON,
  ADD_TYPES,
  SAVE_POKEMON,
  ADD_POKEMON_BY_ID,
} from "../actions/types";

// state de redux
const initialState = {
  pokemons: [],
  types: [],
  page: 0,
  detail: null,
};

// el reducer es el q se encarga de recibir las actions
// procesarlas y modificar el estado en base a estas.
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // cuando la action entra al switch vamos a definir que hacer
    // segun el type de la action, en este caso el ADD_POKEMONS va
    // a modificar el pokemons del estado con el action.payload
    // recibido
    case ADD_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };

    case ADD_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case SEARCH_POKEMON:
      return {
        ...state,
        pokemons: action.payload,
        page: 0,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case SAVE_POKEMON:
      return {
        ...state,
      };
    case ADD_POKEMON_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return { ...state };
  }
};
