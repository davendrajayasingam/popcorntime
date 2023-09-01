import { headers } from 'next/headers'

import { getNowPlayingMovies } from '@/utils/helpers/tmdbApiHelper'
import MovieList from '@/components/MovieList'

export default async function Home() 
{
  const region = headers().get('x-pt-country')!

  const [nowPlaying] = await Promise.all([getNowPlayingMovies(region)])

  return <MovieList movies={nowPlaying} />
}