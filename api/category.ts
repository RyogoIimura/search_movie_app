import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    res.status(500).json({ error: 'API_KEY is not set' });
    return;
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ja-JP`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data.results);
  } catch (error) {
    console.error('category', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
}
