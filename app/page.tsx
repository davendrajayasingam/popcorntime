import { headers } from 'next/headers'

import { getGenres, getMovies } from '@/utils/helpers/tmdbApiHelper'
import GenreFilter from '@/components/filters/GenreFilter'
import PaginatedList from '@/components/PaginatedList'
import RatingsFilter from '@/components/filters/RatingsFilter'
import Sorter from '@/components/filters/Sorter'
import { getAbsolutePath } from '@/utils/helpers/absolutePathHelper'

type Props = {
  searchParams: SearchParams
}

export default async function Home({ searchParams }: Props) 
{
  const region = headers().get('x-pt-country')!

  const currentPage = 1

  const [movies, genres, test] = await Promise.all([
    getMovies({
      page: currentPage,
      sortedBy: searchParams.s !== undefined ? searchParams.s : 'pd',
      genreIds: Array.isArray(searchParams.g) ? searchParams.g.map(g => Number(g)) : searchParams.g !== undefined ? [Number(searchParams.g)] : [],
      rating: searchParams.r !== undefined ? Number(searchParams.r) : 0
    }),
    getGenres(),
    fetch(getAbsolutePath('/api/discover'), {
      method: 'GET',
      next: { revalidate: 20 }
    }).then(res => res.json())
  ])

  return <div>

    <p className='text-white'>Test result: {test}</p>

    <GenreFilter
      genres={genres}
      searchParams={searchParams}
    />

    <RatingsFilter searchParams={searchParams} />

    <Sorter searchParams={searchParams} />

    <PaginatedList
      data={movies}
      currentPage={currentPage}
      searchParams={searchParams}
      genres={genres}
    />

  </div>
}