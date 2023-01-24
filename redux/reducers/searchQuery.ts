import { SET_SEARCH_QUERY } from '../types/index';

type State = string | null;

type Action = {
  type: string;
  payload: State;
};

const initialState: State = null;

const searchQueryReducer =  (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_QUERY: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default searchQueryReducer;