import {
  SET_PAGE,
  ADD_POKEMONS,
  SEARCH_POKEMON,
  ADD_TYPES,
  SAVE_POKEMON,
  ADD_POKEMON_BY_ID,
} from "../actions/types";

const initialState = {
  pokemons: [],
  types: [],
  page: 0,
  detail: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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
