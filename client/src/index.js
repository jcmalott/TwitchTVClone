import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
//applyMiddleware - allows for async actions
//compose - apply multiple store enhancers to store\
// -store enhancers, add functionally to the store
import {createStore, applyMiddleware, compose} from "redux";
//redux-thunk - allows calling actions as a function and not a object
// - allows the use of dispatch
// - dispatch, only way to trigger a state change
import reduxThunk from "redux-thunk";

import App from './components/App';
import reducers from "./reducers";

//extention to work on chrome
//stops the data in redux dev tools from clearing
//http://localhost:3000/?debug_seesion="some random text"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"));
