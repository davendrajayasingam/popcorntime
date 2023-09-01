import { headers } from 'next/headers'

import { getTopRatedMovies } from '@/utils/helpers/tmdbApiHelper'
import PaginatedList from '@/components/PaginatedList'

export default async function Home() 
{
  const region = headers().get('x-pt-country')!

  const [topRatedMovies] = await Promise.all([getTopRatedMovies(region)])

  return <PaginatedList movies={topRatedMovies} />
}