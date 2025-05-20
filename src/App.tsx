import { useEffect, useState } from "react";

import { MovieType, MovieGenreType } from "./types/types";
import Movie from "./components/movie";

function App() {
  const key = import.meta.env.VITE_API_KEY;
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [moviesGenre, setMoviesGenre] = useState<MovieGenreType[]>([]);
  const [count, setCount] = useState<number>(1);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=ja-JP&page=${count}`);
      const data = await response.json();
      const newMovies = [...movies, ...data.results];
      setMovies(newMovies);
      setCount(count+1)
    } catch (error) {
      console.error('movies',error);
    }
  };
  const fetchMovieCategory = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=ja-JP`);
      const data = await response.json();
      setMoviesGenre(data.genres);
    } catch (error) {
      console.error('movies genre',error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchMovieCategory();
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
      <button onClick={() => fetchMovies()} >
        もっと見る
      </button>
    </div>
  );
}

export default App
