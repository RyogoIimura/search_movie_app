export type MovieType = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  genre_ids: [ number ]
}

export type MovieGenreType = {
  id: number;
  name: string;
}
