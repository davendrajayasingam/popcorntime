const fetchHelper = async (url: string): Promise<TMDBResponse> =>
{
    return fetch(url, {
        method: 'GET',
        next: { revalidate: 3600 },
        headers: {
            authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            accept: 'application/json'
        }
    })
        .then(res => res.json())
}

const getMoviesHelper = async (category: string, region: string) =>
{
    let results: Movie[] = []

    const url = `https://api.themoviedb.org/3/movie/${category}?region=${region}`

    const firstPageResponse: TMDBResponse = await fetchHelper(`${url}&page=1`)
    results.push(...firstPageResponse.results)

    const promises: Promise<TMDBResponse>[] = []
    for (let i = 2; i <= firstPageResponse.total_pages; i++)
    {
        promises.push(fetchHelper(`${url}&page=${i}`))
    }

    const otherPagesResponse = await Promise.all(promises)
    for (const response of otherPagesResponse)
    {
        results.push(...response.results)
    }

    return results
}

export const getNowPlayingMovies = (region: string): Promise<Movie[]> =>
    getMoviesHelper('now_playing', region)

export const getTopRatedMovies = (region: string): Promise<Movie[]> =>
    getMoviesHelper('top_rated', region)

export const getPopularMovies = (region: string): Promise<Movie[]> =>
    getMoviesHelper('popular', region)

export const getUpcomingMovies = (region: string): Promise<Movie[]> =>
    getMoviesHelper('upcoming', region)