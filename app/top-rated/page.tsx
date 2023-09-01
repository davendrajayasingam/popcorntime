import { headers } from 'next/headers'

import { getTopRatedMovies } from '@/utils/helpers/tmdbApiHelper'
import MovieList from '@/components/MovieList'

export default async function Home() 
{
  const region = headers().get('x-pt-country')!

  const [nowPlaying] = await Promise.all([getTopRatedMovies(region)])

  return <MovieList movies={nowPlaying} />
}