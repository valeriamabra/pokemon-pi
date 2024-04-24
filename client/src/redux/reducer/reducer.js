import { SET_PAGE, ADD_POKEMONS, SEARCH_POKEMON } from "../actions/types";

const initialState = {
  pages: [],
  page: 0,
};

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

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POKEMONS:
      return {
        ...state,
        pages: getPages(action.payload),
      };

    case SEARCH_POKEMON:
      return {
        ...state,
        pages: getPages(action.payload),
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
