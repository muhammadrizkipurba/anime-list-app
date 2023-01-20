type AnimeImages = {
  jpg: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
  webp: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
};

type Trailer = {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: {
    image_url: string;
    small_image_url: string;
    medium_image_url: string;
    large_image_url: string;
    maximum_image_url: string;
  };
};

type Title = {
  type: string;
  title: string;
};

type Aired = {
  from: string;
  to: string;
  prop: {
    from: {
      day: number;
      month: number;
      year: number;
    };
    to: {
      day: number;
      month: number;
      year: number;
    };
  };
  string: string;
};

type BroadCast = {
  day: string;
  time: string;
  timezone: string;
  string: string;
};

type Producer = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type Licensor = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type Studio = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type Genre = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type Theme = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type Demographic = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type AnimeData = {
  mal_id: number;
  url: string;
  images: AnimeImages;
  trailer: Trailer;
  approved: boolean;
  titles: Title[] | [];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[] | [];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: Producer[] | [];
  licensors: Licensor[] | [];
  studios: Studio[] | [];
  genres: Genre[] | [];
  explicit_genres: [] | [];
  themes: Theme[] | [];
  demographics: Demographic[] | [];
};
