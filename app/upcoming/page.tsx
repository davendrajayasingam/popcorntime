import { headers } from 'next/headers'

import { getUpcomingMovies } from '@/utils/helpers/tmdbApiHelper'
import PaginatedList from '@/components/PaginatedList'

export default async function Home() 
{
  const region = headers().get('x-pt-country')!

  const [upcomingMovies] = await Promise.all([getUpcomingMovies(region)])

  return <PaginatedList movies={upcomingMovies} />
}