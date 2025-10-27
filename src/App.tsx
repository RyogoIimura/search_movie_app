import { useEffect, useRef, useState } from 'react';

import { MovieType, MovieGenreType } from './types/types';
import Movie from './components/Movie';
import { getMovies, getMovieCategory } from './hooks/fetchMoviesFunc';
import { sortMoviesFunc } from './hooks/sortMoviesFunc';
import styles from './styles/_modules/movies.module.scss';

function App() {
  let key = null;
  if( process.env.NODE_ENV === 'development' ) key = import.meta.env.VITE_API_KEY
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [movieGenre, setmovieGenre] = useState<MovieGenreType[]>([]);
  const [count, setCount] = useState<number>(1);

  const loadMovie = async () => {
    const newMovies = await getMovies(key,count);
    setMovies([...movies, ...newMovies]);
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

  // キーワード検索、公開年検索
  const [sortMovies, setSortMovies] = useState<MovieType[]>([]);
  const keyWordRef = useRef<HTMLInputElement | null>(null);
  const [releaseDate, setReleaseDate] = useState<string>('');
  useEffect(() => {
    setSortMovies(sortMoviesFunc(movies, keyWordRef, releaseDate));
  }, [movies, releaseDate]);

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
            onClick={() =>
              setSortMovies(sortMoviesFunc(movies, keyWordRef, releaseDate))
            }
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

      {sortMovies.length === 0 ? (
        !keyWordRef.current ||
        (!keyWordRef.current.value && releaseDate === '') ? (
          <>
          </>
        ) : (
          <>
          </>
        )
      ) : (
        <div className={styles.more_button_wrapper}>
          <button
            className={`${styles.more_button} ${styles.notoJpB}`}
            onClick={() => loadMovie()}
          >
            もっと見る
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
