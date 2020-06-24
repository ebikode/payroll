import { applyMiddleware, compose, createStore } from "redux";
import { fromJS } from "immutable";
import thunkMiddleware from "redux-thunk";

import monitorReducersEnhancer from "./enhancers/monitorReducers";
import loggerMiddleware from "./middlewares/logger";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const initState = {
  global: {},
  auth: {},
  payment: {},
  search: {},
  billing: {},
  plan: {},
  account: {},
  employee: {},
  setting: {},
  log: {},
  token: {}
};

export default function configureStore(preloadedState = initState) {
  const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];

  // console.log(preloadedState);

  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    // dev code
    const composedEnhancers = composeWithDevTools(...enhancers); // for dev

    return createStore(rootReducer, fromJS(preloadedState), composedEnhancers);
  } else {
    // production code
    const composedEnhancers = compose(...enhancers);

    return createStore(rootReducer, fromJS(preloadedState), composedEnhancers);
  }
}
