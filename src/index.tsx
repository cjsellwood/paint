import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import paint from "./store/reducers/paint";
import { State as PaintState } from "./store/reducers/paintTypes";

const composeEnhancers = composeWithDevTools({});

export interface RootState {
  paint: PaintState;
}

const rootReducer = combineReducers({
  paint: paint,
});

const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
