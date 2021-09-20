import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";
import thunkMiddleware from 'redux-thunk'
import { useMemo } from "hoist-non-react-statics/node_modules/@types/react";

let store: any;

function initStore(initialState: any) {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}


export const initializeStore = (preloadState: any) => {
  let _store = store ?? initStore(preloadState);

  if (preloadState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadState
    })
    _store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;
  return _store;
}

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}