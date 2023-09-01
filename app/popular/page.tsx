import { headers } from 'next/headers'

import { getPopularMovies } from '@/utils/helpers/tmdbApiHelper'
import PaginatedList from '@/components/PaginatedList'

export default async function Home() 
{
  const region = headers().get('x-pt-country')!

  const [popularMovies] = await Promise.all([getPopularMovies(region)])

  return <PaginatedList movies={popularMovies} />
}