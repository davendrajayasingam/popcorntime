import { format } from 'date-fns'

const fetchMovies = async (url: string): Promise<TMDBResponse> =>
    fetch(url, {
        method: 'GET',
        next: { revalidate: 86400 },
        headers: {
            authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            accept: 'application/json'
        }
    }).then(res => res.json())

const createUrl = ({ page, region, genreIds, ratings, minVotes, sortedBy }: MovieQuery): string =>
{
    const today = new Date()
    const future = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4)
    const past = new Date(future.getFullYear(), future.getMonth(), future.getDate() - 42)

    const maxDate = format(future, 'yyyy-MM-dd')
    const minDate = format(past, 'yyyy-MM-dd')

    let url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&with_release_type=3'

    url += `&page=${page}`

    url += `&release_date.gte=${minDate}&release_date.lte=${maxDate}`

    url += `&sort_by=${sortedBy || 'popularity.desc'}`

    if (region)
    {
        url += `&region=${region}`
    }

    if (genreIds)
    {
        url += `&with_genres=${genreIds.join(',')}`
    }

    if (ratings)
    {
        url += `&vote_average.gte=${ratings.min}&vote_average.lte=${ratings.max}`
    }

    if (minVotes)
    {
        url += `&vote_count.gte=${minVotes}`
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
        .then(genres => genres.map(({ id, name }: { id: number, name: string }) => ({ id: `${id}`, name })))