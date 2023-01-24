import axios from 'axios';

export type AddToFavoriteParams = {
  user_id: string;
  favorite_arr: string[];
}

export const updateFavoriteAnimes = async({ user_id, favorite_arr }: AddToFavoriteParams) => {
  const response = await axios.put("/api/user-favorite", {
    body: {
      user_id,
      favorite_arr
    },
  });

  return response.data;
};
