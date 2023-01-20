import { SET_ANIME_LIST } from "../types/index";

type State = AnimeData[] | [];

type Action = {
  type: string;
  payload: State;
};

const initialState: State = [];

const animeListsReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ANIME_LIST: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default animeListsReducer;