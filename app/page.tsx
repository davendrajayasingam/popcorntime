import { headers } from 'next/headers'

import { getMovies } from '@/utils/helpers/tmdbApiHelper'
import PaginatedList from '@/components/PaginatedList'

export default async function Home() 
{
  const region = headers().get('x-pt-country')!

  const currentPage = 1

  const movies = await getMovies({
    page: currentPage,
    sortedBy: 'popularity.desc'
  })

  return <PaginatedList
    data={movies}
    currentPage={currentPage}
  />
}