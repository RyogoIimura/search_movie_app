import { useEffect, useRef, useState } from "react";

import { getMovies, getMovieCategory } from "./api/api";
import { MovieType, MovieGenreType } from "./types/types";
import Movie from "./components/movie";
import { useSortMovies } from "./hooks/useSortMovies";

function App() {
  const key = import.meta.env.VITE_API_KEY;
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [movieGenre, setmovieGenre] = useState<MovieGenreType[]>([]);
  const [count, setCount] = useState<number>(1);

  const loadMoview = async () => {
    const newMovies = await getMovies(key, count);
    setMovies([...movies, ...newMovies]);
    setCount(count+1);
    setSortMovies(useSortMovies(movies,keyWordRef,releaseDate))
  }
  const loadmovieGenre = async () => {
    const movieGenre = await getMovieCategory(key);
    setmovieGenre(movieGenre);
  }

  useEffect(() => {
    loadMoview();
    loadmovieGenre();
  }, [key]);

  const [sortMovies, setSortMovies] = useState<MovieType[]>([]);
  // キーワード検索
  const keyWordRef = useRef<HTMLInputElement | null>(null);
  // 公開年検索
  const [releaseDate,setReleaseDate] = useState<string>('');

  // useEffect(() => console.log(movies), [movies]);
  // useEffect(() => console.log(movieGenre), [movieGenre]);

  return (
    <div>
      <h1>Search Movie App</h1>

      <div>
        <input type="text" ref={keyWordRef} />
        <button type="button" onClick={() => setSortMovies(useSortMovies(movies,keyWordRef,releaseDate))}>
          キーワード検索
        </button>
      </div>

      <select
        name="release_date"
        onChange={(e) => {
          setReleaseDate(e.target.value);
          setSortMovies(useSortMovies(movies,keyWordRef,e.target.value))
        }}
      >
        <option value="">公開年</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>

      <ul>
        { sortMovies.length === 0 ? (
          movies.map((movie,index) => (
            <li key={index}>
              <Movie
                movie={movie}
                movieGenre={movieGenre}
              />
            </li>
          ))
        ) : (
          sortMovies.map((searchMovie,index) => (
            <li key={index}>
              <Movie
                movie={searchMovie}
                movieGenre={movieGenre}
              />
            </li>
          ))
        )}
      </ul>

      <button onClick={() => loadMoview()} >
        もっと見る
      </button>
    </div>
  );
}

export default App
