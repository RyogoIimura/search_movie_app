import { useEffect, useRef, useState } from 'react';

import { MovieType, MovieGenreType } from './types/types';
import Movie from './components/Movie';
import { getMovies, getMovieCategory, getSortMovies } from './hooks/fetchMoviesFunc';
import styles from './styles/_modules/movies.module.scss';
import { sortKeyWord } from './hooks/sortKeyWord';

function App() {
  let key: string | null = null;
  if( process.env.NODE_ENV === 'development' ) key = import.meta.env.VITE_API_KEY
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [movieGenre, setmovieGenre] = useState<MovieGenreType[]>([]);
  const [count, setCount] = useState<number>(0);

  // 20件取得、ジャンル表示
  const loadMovie = async () => {
    const newMovies = await getMovies(key,count);
    setMovies([...movies, ...newMovies]);
    if( keyWordRef.current && keyWordRef.current.value ){
      const newSortMovies = sortKeyWord([...movies, ...newMovies],keyWordRef);
      setSortMovies(newSortMovies)
    } else {
      setSortMovies([])
    }
    setCount(count + 1);
  };
  const loadmovieGenre = async () => {
    const movieGenre = await getMovieCategory(key);
    setmovieGenre(movieGenre);
  };
  useEffect(() => {
    loadMovie();
    loadmovieGenre();
  }, []);

  const [sortMovies, setSortMovies] = useState<MovieType[]>([]);
  // キーワード検索
  const keyWordRef = useRef<HTMLInputElement | null>(null);
  const sortKeyWordMovies = () => {
    if( keyWordRef.current && keyWordRef.current.value ){
      if( releaseDate ) sortReleaseMovies();
      else setSortMovies(sortKeyWord(movies,keyWordRef))
    }
    else setSortMovies([]);
  };
  // 公開年検索
  const [releaseDate, setReleaseDate] = useState<string>('');
  const sortReleaseMovies = async () => {
    const newReleaseMovies = await getSortMovies(key,count,releaseDate);
    if( releaseDate ){
      if( keyWordRef.current && keyWordRef.current.value ){
        const newSortMovies = sortKeyWord(newReleaseMovies,keyWordRef);
        setSortMovies(newSortMovies)
      }
      else setSortMovies(newReleaseMovies);
      console.log(releaseDate);
    }
    else setSortMovies([]);
  };
  useEffect(() => {
    if( releaseDate != "" ) sortReleaseMovies()
  }, [releaseDate]);

  return (
    <div className={`${styles.movies} ${styles.notoJpR}`}>
      <h1 className={`${styles.title} ${styles.interB}`}>Search Movie App</h1>

      <div className={styles.search_wrapper}>
        <div className={styles.keyword}>
          <input
            className={styles.keyword_input}
            type="text"
            ref={keyWordRef}
          />
          <button
            className={`${styles.keyword_button} ${styles.notoJpB}`}
            type="button"
            onClick={() => sortKeyWordMovies()}
          >
            検索
          </button>
        </div>
        <div className={`${styles.years}`}>
          <select
            className={`${styles.years_select} ${styles.notoJpB}`}
            name="release_date"
            onChange={(e) => setReleaseDate(e.target.value)}
          >
            <option value="">公開年</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>

      {!keyWordRef.current ||
      (!keyWordRef.current.value && releaseDate === '') ? (
        <p className={styles.anotation}>
          キーワード、または公開年を指定してください
        </p>
      ) : (
        ''
      )}

      <ul className={styles.movies_wrapper}>
        {sortMovies.length === 0 ? (
          !keyWordRef.current ||
          (!keyWordRef.current.value && releaseDate === '') ? (
            <>
              {movies.map((movie, index) => (
                <li className={styles.movie} key={index}>
                  <Movie movie={movie} movieGenre={movieGenre} />
                </li>
              ))}
            </>
          ) : (
            <p className={styles.zero}>0件です</p>
          )
        ) : (
          sortMovies.map((searchMovie, index) => (
            <li className={styles.movie} key={index}>
              <Movie movie={searchMovie} movieGenre={movieGenre} />
            </li>
          ))
        )}
      </ul>

      <div className={styles.more_button_wrapper}>
        {sortMovies.length === 0 ? (
          !keyWordRef.current ||
          (!keyWordRef.current.value && releaseDate === '') ? (
            <button
              className={`${styles.more_button} ${styles.notoJpB}`}
              onClick={() => loadMovie()}
            >
              もっと見る
            </button>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
