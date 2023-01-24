import { SET_SEARCH_QUERY, SET_SEARCH_RESULT, SET_PAGINATION, SET_AUTH } from '../types/index';

type SetSearchQueryPayload = string | null;
type SetSearchResultPayload = AnimeData[] | [];
type SetAuthPayload = {
  isAuthenticated: boolean,
  user: UserData | null
};

export const setReducerSearchQuery = (payload: SetSearchQueryPayload) => ({
  type: SET_SEARCH_QUERY,
  payload
});

export const setReducerSearchResult = (payload: SetSearchResultPayload) => ({
  type: SET_SEARCH_RESULT,
  payload
});

export const setReducerPagination = (payload: SetSearchQueryPayload) => ({
  type: SET_PAGINATION,
  payload
});

export const setReducerAuth = (payload: SetAuthPayload) => ({
  type: SET_AUTH,
  payload
});