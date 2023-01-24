import { combineReducers } from "redux";
import searchQueryReducer from './searchQuery';
import searchResultReducer from './searchResult';
import paginationReducer from "./pagination";
import authReducer from './auth';

export const initialState: any = {
  auth: {
    isAuthenticated: false,
    user: null
  },
  searchQuery: null,
  searchResult: [],
  pagination: null,
};

const rootReducer = combineReducers({
  auth: authReducer,
  searchQuery: searchQueryReducer,
  searchResult: searchResultReducer,
  pagination: paginationReducer
});

export default rootReducer;