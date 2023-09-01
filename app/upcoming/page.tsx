import { headers } from 'next/headers'

import { getUpcomingMovies } from '@/utils/helpers/tmdbApiHelper'
import MovieList from '@/components/MovieList'

export default async function Home() 
{
  const region = headers().get('x-pt-country')!

  const [nowPlaying] = await Promise.all([getUpcomingMovies(region)])

  return <MovieList movies={nowPlaying} />
}