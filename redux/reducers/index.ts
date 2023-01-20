import { combineReducers } from "redux";
import animeListsReducer from './animeLists';
import selectedAnimeReducer from './selectedAnime';

export const initialState: any = {
  animeLists: [],
  selectedAnime: null,
};

const rootReducer = combineReducers({
  animeLists: animeListsReducer,
  selectedAnime: selectedAnimeReducer
});

export default rootReducer;