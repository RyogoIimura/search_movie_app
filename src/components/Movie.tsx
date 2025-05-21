import { MovieType, MovieGenreType } from "../types/types";

type ComponentsMovieTypes = {
  movie: MovieType,
  movieGenre: MovieGenreType[]
}

const Movie = (props: ComponentsMovieTypes) => {
  const { movie, movieGenre } = props

  return (
    <>
      {/* 映画タイトル */}
      <p>{ movie.title }</p>

      {/* サムネイル画像 w500 × h750 */}
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

      {/* リリース年月日 */}
      <p>{ typeof movie.release_date }</p>

      {/* 映画ジャンル（複数表示） */}
      <p>
        { movie.genre_ids.map((id: number, i: number) => (
          movieGenre.map((genre: MovieGenreType, index: number) => (
            genre.id === id && (
              <span key={index}>
                { i !== 0 && ('、')}
                { genre.name }
              </span>
            )
          ))
        ))}
      </p>
    </>
  );
};

export default Movie;
