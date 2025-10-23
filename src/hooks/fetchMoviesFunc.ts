export const getMovies = async (count: number) => {
  const res = await fetch(`/api/movies?count=${count}`);
  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }
  const movies = await res.json();
  return movies;
};

export const getMovieCategory = async () => {
  const res = await fetch(`/api/category`);
  if (!res.ok) {
    throw new Error('Failed to fetch category');
  }
  const category = await res.json();
  return category;
};
