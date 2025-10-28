
export const getMovies = async (key: string | null, count: number) => {
  // 開発
  if( key ){
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=ja-JP&page=${count+1}`,
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('movies', error);
    }

  // 本番
  } else {
    const res = await fetch(`/api/movies?count=${count+1}`);
    if (!res.ok) throw new Error('Failed to fetch movies');

    return res.text().then(t => (t ? JSON.parse(t) : []));
  }
};

export const getMovieCategory = async (key: string | null) => {
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


export const getSortMovies = async (key: string | null, count: number, releaseDate: string) => {
  // 開発
  if( key ){
    try {
      let arr: number[] = [];
      for( let i = 0; i < count; i++ ){
        arr = [...arr,i+1]
      }
      console.log(count,arr)
      const requests = arr.map(num =>
        fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=ja-JP&sort_by=popularity.desc&primary_release_year=${releaseDate}&page=${num}`
        ).then(res => res.json())
      );
      const results = await Promise.all(requests);
      const movies = results.flatMap(data => data.results);
      return movies;

    } catch (error) {
      console.error('sort movies', error);
      return [];
    }

  // 本番
  } else {
    // const res = await fetch(`/api/release`);
    // if (!res.ok) throw new Error('Failed to fetch release');

    // return res.text().then(t => (t ? JSON.parse(t) : []));
  }
};
