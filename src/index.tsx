import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import paint from "./store/reducers/paint";

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  paint: paint,
});

const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}></Provider>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
