
export const getMovies = async (count: number) => {
  const res = await fetch(`/api/movies?count=${count}`);
  if (!res.ok) throw new Error('Failed to fetch movies');

  return res.text().then(t => (t ? JSON.parse(t) : []));
};

export const getMovieCategory = async () => {
  const res = await fetch(`/api/category`);
  if (!res.ok) throw new Error('Failed to fetch category');

  return res.text().then(t => (t ? JSON.parse(t) : []));
};
