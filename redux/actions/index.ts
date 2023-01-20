import { SET_ANIME_LIST, SET_SELECTED_ANIME } from '../types/index';

type SetAnimeListPayload = AnimeData[] | [];
type SetSelectedAnimePayload = AnimeData | null;

export const setAnimeListAction = (payload: SetAnimeListPayload) => ({
  type: SET_ANIME_LIST,
  payload
});

export const setSelectedAnimeAction = (payload: SetSelectedAnimePayload) => ({
  type: SET_SELECTED_ANIME,
  payload
});