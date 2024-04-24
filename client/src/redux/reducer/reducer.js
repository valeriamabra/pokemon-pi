import {
  SET_PAGE,
  ADD_POKEMONS,
  SEARCH_POKEMON,
  ADD_TYPES,
} from "../actions/types";

const initialState = {
  pokemons: [],
  types: [],
  page: 0,
};

// el reducer es el que efectivamente va a modificar el estado
// conforme lleguen las actions. Cuando desde alguna parte del app
// despachamos una action (desde los actions creatos), esa action
// va a pasar por el reducer
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // cuando la action entra al switch vamos a definir que hacer
    // segun el type de la action, en este caso el ADD_POKEMONS va
    // a modificar el pokemons del estado guardando en el el action.payload
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

    default:
      return { ...state };
  }
};
