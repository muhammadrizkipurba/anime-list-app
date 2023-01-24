import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, Store as ReduxStore } from "redux";

import rootReducer, { initialState } from "./reducers";
import { createWrapper } from "next-redux-wrapper";
import storage from "./sync_storage";

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    //If it's on server side, create a store
    return createStore(rootReducer, bindMiddleware([thunkMiddleware]));
  } else {
    //If it's on client side, create a store which will persist
    const { persistReducer } = require('redux-persist');

    const persistConfig = {
      key: 'root',
      whitelist: ['searchQuery', 'searchResult', 'pagination', 'auth'], // only counter will be persisted, add other reducers if needed
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    );
    
    return store;
  }
};

export const wrapper = createWrapper(makeStore);