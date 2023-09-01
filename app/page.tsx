import { headers } from 'next/headers'

import { getNowPlayingMovies } from '@/utils/helpers/tmdbApiHelper'
import PaginatedList from '@/components/PaginatedList'

export default async function Home() 
{
  const region = headers().get('x-pt-country')!

  const [nowPlayingMovies] = await Promise.all([getNowPlayingMovies(region)])

  return <PaginatedList movies={nowPlayingMovies} />
}