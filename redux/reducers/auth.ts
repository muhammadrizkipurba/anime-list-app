import { SET_AUTH } from '../types/index';

export type UserData = {
  name: string;
  email: string;
  favorite_animes: number[] | [];
};

type State = {
  isAuthenticated: boolean;
  user: UserData | null
};

type Action = {
  type: string;
  payload: State;
};

const initialState: State = {
  isAuthenticated: false,
  user: null
};

const authReducer =  (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_AUTH: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default authReducer;