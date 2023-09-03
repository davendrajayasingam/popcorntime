import { headers } from 'next/headers'

import { getGenres, getMovies } from '@/utils/helpers/tmdbApiHelper'
import PaginatedList from '@/components/PaginatedList'
import GenreFilter from '@/components/filters/GenreFilter'
import RatingsFilter from '@/components/filters/RatingsFilter'

type Props = {
    params: {
        pageNumber: string
    },
    searchParams: SearchParams
}

const fetchMoviesHelper = async (pageNumber: number, searchParams: SearchParams) => getMovies({
    page: pageNumber,
    sortedBy: 'popularity.desc',
    genreIds: Array.isArray(searchParams.g) ? searchParams.g.map(g => Number(g)) : searchParams.g !== undefined ? [Number(searchParams.g)] : [],
    rating: searchParams.r !== undefined ? Number(searchParams.r) : 0
})

export default async function PaginationPage({ params, searchParams }: Props)
{
    const region = headers().get('x-pt-country')!

    let pageNumber = Math.min(Math.max(Number(params.pageNumber) || 1, 1), 100)

    let [movies, genres] = await Promise.all([
        fetchMoviesHelper(pageNumber, searchParams),
        getGenres()
    ])

    if (pageNumber > movies.totalPages)
    {
        pageNumber = movies.totalPages
        movies = await fetchMoviesHelper(pageNumber, searchParams)
    }

    return <div>

        <GenreFilter
            genres={genres}
            searchParams={searchParams}
        />

        <RatingsFilter searchParams={searchParams} />

        <PaginatedList
            data={movies}
            currentPage={pageNumber}
            searchParams={searchParams}
            genres={genres}
        />

    </div>
}