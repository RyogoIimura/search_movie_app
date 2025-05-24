import { MovieType } from "../types/types";

export const useSortMovies = (
  movies: MovieType[],
  keyWordRef: React.RefObject<HTMLInputElement | null>,
  date: string
) => {
  if( keyWordRef.current ){
    // console.log(Boolean(keyWordRef.current.value),Boolean(date))

    // どちらもない場合
    if( !keyWordRef.current.value && date === '' ){
      // console.log('どちらもない場合');
      return []

    // キーワードのみある場合
    } else if( keyWordRef.current.value && date === '' ){
      const keyWord = keyWordRef.current.value;
      const newMovies = movies.filter((movie) => (
        movie.title.includes(keyWord)
      ));
      // console.log('キーワードのみある場合',newMovies);
      return newMovies;

    // 公開年のみある場合
    } else if( !keyWordRef.current.value && date ){
      const newMovies = movies.filter((movie) => (
        movie.release_date.includes(date)
      ));
      // console.log('公開年のみある場合',newMovies);
      return newMovies;

    // どちらもある場合
    } else {
      const keyWord = keyWordRef.current.value;
      const newMovies = movies.filter((movie) =>
        movie.title.includes(keyWord) && movie.release_date.includes(date)
      );
      // console.log('どちらもある場合',newMovies);
      return newMovies;
    }

  } else {
    return []
  }
};