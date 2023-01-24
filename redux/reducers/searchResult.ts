import { SET_SEARCH_RESULT } from '../types/index';

type State = AnimeData[] | [];

type Action = {
  type: string;
  payload: State;
};

const initialState: State = [];

const searchResultReducer =  (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_RESULT: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default searchResultReducer;