import { headers } from 'next/headers'

import { getPopularMovies } from '@/utils/helpers/tmdbApiHelper'
import MovieList from '@/components/MovieList'

export default async function Home() 
{
  const region = headers().get('x-pt-country')!

  const [nowPlaying] = await Promise.all([getPopularMovies(region)])

  return <MovieList movies={nowPlaying} />
}