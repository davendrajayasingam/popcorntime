import { format } from 'date-fns'
import { sortOptions } from '@/components/filters/Sorter'

const fetchMovies = async (url: string): Promise<TMDBResponse> =>
    fetch(url, {
        method: 'GET',
        next: { revalidate: 86400 },
        headers: {
            authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            accept: 'application/json'
        }
    }).then(res => res.json())

const createUrl = ({ page, region, genreIds, rating, minVotes, sortedBy }: MovieQuery): string =>
{
    const today = new Date()
    const future = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4)
    const past = new Date(future.getFullYear(), future.getMonth(), future.getDate() - 42)

    const maxDate = format(future, 'yyyy-MM-dd')
    const minDate = format(past, 'yyyy-MM-dd')

    let url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&with_release_type=3'

    url += `&page=${page}`

    url += `&primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}`

    if (region)
    {
        url += `&region=${region}`
    }

    if (genreIds)
    {
        url += `&with_genres=${genreIds.join(',')}`
    }

    if (rating)
    {
        url += `&vote_average.gte=${rating}&vote_count.gte=20`
    }

    if (minVotes)
    {
        url += `&vote_count.gte=${minVotes}`
    }

    if (sortedBy)
    {
        const sortOption: SortOption = sortOptions.find(option => option.value === sortedBy) || sortOptions[0]
        url += `&sort_by=${sortOption.param}`
    }
    else
    {
        url += `&sort_by=${sortOptions[0].param}`
    }

    return url
}

export const getMovies = async (query: MovieQuery): Promise<MovieResponse> =>
{
    const { page } = query

    const appendFromPreviousPage = (page * 30) % 20 === 0
    const startingPage = page * 30 / 20

    const firstQuery = { ...query, page: appendFromPreviousPage ? startingPage - 1 : Math.floor(startingPage) }
    const secondQuery = { ...query, page: appendFromPreviousPage ? startingPage : Math.ceil(startingPage) }

    const [firstResponse, secondResponse] = await Promise.all([
        fetchMovies(createUrl(firstQuery)),
        fetchMovies(createUrl(secondQuery))
    ])

    return {
        totalPages: Math.ceil(firstResponse.total_results / 30),
        movies: [
            ...(appendFromPreviousPage ? firstResponse.results.slice(-10) : firstResponse.results),
            ...(appendFromPreviousPage ? secondResponse.results : secondResponse.results.slice(0, 10))
        ]
    }
}

export const getGenres = async (): Promise<Genre[]> =>
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
        method: 'GET',
        next: { revalidate: 86400 },
        headers: {
            authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            accept: 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => res.genres)