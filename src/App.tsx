import { useEffect, useState } from "react";

import { fetchMovies, fetchMovieCategory } from "./api/api";
import { MovieType, MovieGenreType } from "./types/types";
import Movie from "./components/movie";

function App() {
  const key = import.meta.env.VITE_API_KEY;
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [moviesGenre, setMoviesGenre] = useState<MovieGenreType[]>([]);
  const [count, setCount] = useState<number>(1);

  const loadMoview = async () => {
    const newMovies = await fetchMovies(key, count);
    setMovies([...movies, ...newMovies]);
    setCount(count+1)
  }
  const loadMoviesGenre = async () => {
    const moviesGenre = await fetchMovieCategory(key);
    setMoviesGenre(moviesGenre);
  }

  useEffect(() => {
    loadMoview();
    loadMoviesGenre();
  }, [key]);

  return (
    <div>
      <h1>Search Movie App</h1>
      <ul>
        { movies.map((movie) => (
          <li key={movie.id}>
            <Movie
              movie={movie}
              moviesGenre={moviesGenre}
            />
          </li>
        ))}
      </ul>
      <button onClick={() => loadMoview()} >
        もっと見る
      </button>
    </div>
  );
}

export default App
