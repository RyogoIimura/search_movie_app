import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [moviesGenre, setMoviesGenre] = useState([]);
  const key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=ja-JP&page=1`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('movies',error);
      }
    };
    fetchMovies();
    // console.log(movies);

    const fetchMovieCategory = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=ja-JP`);
        const data = await response.json();
        setMoviesGenre(data.genres);
      } catch (error) {
        console.error('movies genre',error);
      }
    };
    fetchMovieCategory();
  }, [key]);
  // console.log(moviesGenre);

  return (
    <div>
      <h1>Search Movie App</h1>
      <ul>
        { movies.map((movie) => (
          <li key={movie.id}>

            {/* 映画タイトル */}
            <p>{ movie.title }</p>

            {/* サムネイル画像 w500 × h750 */}
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

            {/* リリース年月日 */}
            <p>{ movie.release_date }</p>

            {/* 映画ジャンル（複数表示） */}
            <p>
              { movie.genre_ids.map((id,i) => (
                moviesGenre.map((genre,index) => (
                  genre.id === id && (
                    <span key={index}>
                      { i !== 0 && ('、')}
                      { genre.name }
                    </span>
                  )
                ))
              ))}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
