import { useEffect, useRef, useState } from "react";

import { getMovies, getMovieCategory } from "./api/api";
import { MovieType, MovieGenreType } from "./types/types";
import Movie from "./components/movie";

function App() {
  const key = import.meta.env.VITE_API_KEY;
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [movieGenre, setmovieGenre] = useState<MovieGenreType[]>([]);
  const [count, setCount] = useState<number>(1);

  const loadMoview = async () => {
    const newMovies = await getMovies(key, count);
    setMovies([...movies, ...newMovies]);
    setCount(count+1);
    handleSearch()
  }
  const loadmovieGenre = async () => {
    const movieGenre = await getMovieCategory(key);
    setmovieGenre(movieGenre);
  }

  // キーワード検索
  const keyWordRef = useRef<HTMLInputElement | null>(null);
  const [searchMovies, setSearchMovies] = useState<MovieType[]>([]);
  const handleSearch = () => {
    if( keyWordRef.current ){
      const keyWord = keyWordRef.current.value;
      const newMovies = movies.filter((movie) => (
        movie.title.includes(keyWord)
      ));
      setSearchMovies(newMovies)
    }
  };

  useEffect(() => {
    loadMoview();
    loadmovieGenre();
  }, [key]);

  // useEffect(() => console.log(movies), [movies]);
  // useEffect(() => console.log(movieGenre), [movieGenre]);

  return (
    <div>
      <h1>Search Movie App</h1>

      <div>
        <input type="text" ref={keyWordRef} />
        <button type="button" onClick={() => handleSearch()}>
          キーワード検索
        </button>
        <button type="button" onClick={() => setSearchMovies([])}>
          クリア
        </button>
      </div>

      <ul>
        { searchMovies.length === 0 ? (
          movies.map((movie) => (
            <li key={movie.id}>
              <Movie
                movie={movie}
                movieGenre={movieGenre}
              />
            </li>
          ))
        ) : (
          searchMovies.map((searchMovie) => (
            <li key={searchMovie.id}>
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
