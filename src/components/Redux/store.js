import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { CartReducer } from "./allReducers";
const store = createStore(
  CartReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  console.log("state changed");
});

export default store;
