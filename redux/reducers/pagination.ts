import { SET_PAGINATION } from '../types/index';

type State = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
} | null;

type Action = {
  type: string;
  payload: State;
};

const initialState: State = null;

const paginationReducer =  (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PAGINATION: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default paginationReducer;