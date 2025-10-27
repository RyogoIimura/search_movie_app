
export const getMovies = async (key: string, count: number) => {
  // 開発
  if( key ){
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=ja-JP&page=${count}`,
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('movies', error);
    }

  // 本番
  } else {
    const res = await fetch(`/api/movies?count=${count}`);
    if (!res.ok) throw new Error('Failed to fetch movies');

    return res.text().then(t => (t ? JSON.parse(t) : []));
  }
};

export const getMovieCategory = async (key: string) => {
  // 開発
  if( key ){
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=ja-JP`,
      );
      const data = await response.json();
      return data.genres;
    } catch (error) {
      console.error('movies genre', error);
    }

  // 本番
  } else {
    const res = await fetch(`/api/category`);
    if (!res.ok) throw new Error('Failed to fetch category');

    return res.text().then(t => (t ? JSON.parse(t) : []));
  }
};
