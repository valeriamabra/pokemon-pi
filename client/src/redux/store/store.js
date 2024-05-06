import { createStore, applyMiddleware } from "redux"; //libreria para manejar estados
import thunk from "redux-thunk";
import { rootReducer } from "../reducer/reducer";

//para crear un store de react defino el reducer
const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // esta línea es para poder hacer peticiones a un server
);
export default store;
