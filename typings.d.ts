type Movie = {
    adult: boolean
    backdrop_path: string | null
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string | null
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

type TMDBResponse = {
    dates: {
        maximum: string
        minimum: string
    }
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}

type MovieQuery = {
    page: number
    region?: string
    genreIds?: number[]
    ratings?: {
        min: number
        max: number
    }
    minVotes?: number
    sortedBy?: 'title.asc' | 'title.desc' | 'release_date.asc' | 'release_date.desc' | 'popularity.asc' | 'popularity.desc' | 'vote_average.asc' | 'vote_average.desc'
}

type MovieResponse = {
    movies: Movie[]
    totalPages: number
}

type Genre = {
    id: number
    name: string
}

type SearchParams = { [key: string]: string | string[] | undefined }