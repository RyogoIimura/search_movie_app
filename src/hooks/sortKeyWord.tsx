import { MovieType } from '../types/types';

export const sortKeyWord = (
  movies: MovieType[],
  keyWordRef: React.RefObject<HTMLInputElement | null>
) => {
  if( keyWordRef.current ){
    if( !keyWordRef.current.value ){
      return movies;

    } else {
      const keyWord = keyWordRef.current.value;
      const newMovies = movies.filter((movie) => movie.title.includes(keyWord));
      return newMovies;
    }
  } else {
    return [];
  }
};
