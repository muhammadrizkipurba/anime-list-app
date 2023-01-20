import { SET_SELECTED_ANIME } from "../types/index";

type State = AnimeData | null;

type Action = {
  type: string;
  payload: State;
};

const initialState: State = null;

const selectedAnimeReducer =  (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SELECTED_ANIME: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default selectedAnimeReducer;