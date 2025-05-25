import { MovieType, MovieGenreType } from '../types/types';
import styles from '../styles/_modules/components/movie.module.scss';

type ComponentsMovieTypes = {
  movie: MovieType;
  movieGenre: MovieGenreType[];
};

const Movie = (props: ComponentsMovieTypes) => {
  const { movie, movieGenre } = props;

  return (
    <>
      {/* 映画タイトル */}
      <p className={`${styles.movie_title} ${styles.interB}`}>{movie.title}</p>

      {/* サムネイル画像 w500 × h750 */}
      <div className={`${styles.movie_img_container}`}>
        <img
          className={styles.movie_img}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      {/* リリース年月日 */}
      <p className={styles.movie_date}>{movie.release_date}</p>

      {/* 映画ジャンル（複数表示） */}
      <p className={styles.movie_genre}>
        {movie.genre_ids.map((id: number, i: number) =>
          movieGenre.map(
            (genre: MovieGenreType, index: number) =>
              genre.id === id && (
                <span key={index}>
                  {i !== 0 && '、'}
                  {genre.name}
                </span>
              ),
          ),
        )}
      </p>
    </>
  );
};

export default Movie;
