import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducer/reducer";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // esta línea es para poder hacer peticiones a un server
);
export default store;
