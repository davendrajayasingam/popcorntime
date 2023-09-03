import { headers } from 'next/headers'

import { getGenres, getMovies } from '@/utils/helpers/tmdbApiHelper'
import GenreFilter from '@/components/filters/GenreFilter'
import PaginatedList from '@/components/PaginatedList'
import RatingsFilter from '@/components/filters/RatingsFilter'

type Props = {
  searchParams: SearchParams
}

export default async function Home({ searchParams }: Props) 
{
  const region = headers().get('x-pt-country')!

  const currentPage = 1

  const [movies, genres] = await Promise.all([
    getMovies({
      page: currentPage,
      sortedBy: 'popularity.desc',
      genreIds: Array.isArray(searchParams.g) ? searchParams.g.map(g => Number(g)) : searchParams.g !== undefined ? [Number(searchParams.g)] : [],
      rating: searchParams.r !== undefined ? Number(searchParams.r) : 0
    }),
    getGenres()
  ])

  return <div>

    <GenreFilter
      genres={genres}
      searchParams={searchParams}
    />

    <RatingsFilter searchParams={searchParams} />

    <PaginatedList
      data={movies}
      currentPage={currentPage}
      searchParams={searchParams}
      genres={genres}
    />

  </div>
}