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

type Sortable = 'pa' | 'pd' | 'va' | 'vd' | 'ra' | 'rd' | 'ta' | 'td'

type SortOption = {
    label: 'Popularity' | 'Rating' | 'Release Date' | 'Title'
    order: 'desc' | 'asc'
    value: Sortable
    param: 'popularity.asc' | 'popularity.desc' | 'vote_average.asc' | 'vote_average.desc' | 'release_date.asc' | 'release_date.desc' | 'title.asc' | 'title.desc'
}

type MovieQuery = {
    page: number
    region?: string
    genreIds?: number[]
    rating: number
    minVotes?: number
    sortedBy?: SortOption.value
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