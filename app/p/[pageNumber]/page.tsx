import { headers } from 'next/headers'

import { getMovies } from '@/utils/helpers/tmdbApiHelper'
import PaginatedList from '@/components/PaginatedList'

type Props = {
    params: {
        pageNumber: string
    }
}

const fetchMoviesHelper = async (pageNumber: number) => getMovies({
    page: pageNumber,
    sortedBy: 'popularity.desc'
})

export default async function PaginationPage({ params }: Props)
{
    const region = headers().get('x-pt-country')!

    let pageNumber = Math.min(Math.max(Number(params.pageNumber) || 1, 1), 100)

    let movies = await fetchMoviesHelper(pageNumber)

    if (pageNumber > movies.totalPages)
    {
        pageNumber = movies.totalPages
        movies = await fetchMoviesHelper(pageNumber)
    }

    return <PaginatedList
        data={movies}
        currentPage={pageNumber}
    />
}