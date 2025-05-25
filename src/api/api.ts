export const getMovies = async (key: string, count: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=ja-JP&page=${count}`,
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('movies', error);
  }
};

export const getMovieCategory = async (key: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=ja-JP`,
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('movies genre', error);
  }
};
