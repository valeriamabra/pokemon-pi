import { createStore, applyMiddleware } from "redux"; //libreria para manejar estados
import thunk from "redux-thunk";
import { rootReducer } from "../reducer/reducer";

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
