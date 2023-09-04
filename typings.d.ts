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

type SortOption = {
    label: 'Popularity' | 'Rating' | 'Release Date' | 'Title'
    order: 'desc' | 'asc'
    value: 'popularity.asc' | 'popularity.desc' | 'vote_average.asc' | 'vote_average.desc' | 'primary_release_date.asc' | 'primary_release_date.desc' | 'title.asc' | 'title.desc'
}

type MovieQuery = {
    page?: number
    region?: string
    genreIds?: number[]
    rating?: number
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

type MovieDetails = {
    adult: boolean
    backdrop_path: string | null
    belongs_to_collection: {
        id: number
        name: string
        poster_path: string | null
        backdrop_path: string | null
    } | null
    budget: number
    genres: Genre[]
    homepage: string | null
    id: number
    imdb_id: string | null
    original_language: string
    original_title: string
    overview: string | null
    popularity: number
    poster_path: string | null
    production_companies: {
        id: number
        logo_path: string | null
        name: string
        origin_country: string
    }[]
    production_countries: {
        iso_3166_1: string
        name: string
    }[]
    release_date: string
    revenue: number
    runtime: number | null
    spoken_languages: {
        english_name: string
        iso_639_1: string
        name: string
    }[]
    status: string
    tagline: string | null
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    credits: {
        cast: {
            adult: boolean
            gender: number | null
            id: number
            known_for_department: string
            name: string
            original_name: string
            popularity: number
            profile_path: string | null
            cast_id: number
            character: string
            credit_id: string
            order: number
        }[]
        crew: {
            adult: boolean
            gender: number | null
            id: number
            known_for_department: string
            name: string
            original_name: string
            popularity: number
            profile_path: string | null
            credit_id: string
            department: string
            job: string
        }[]
    }
    videos: {
        results: {
            id: string
            iso_639_1: string
            iso_3166_1: string
            key: string
            name: string
            site: string
            size: number
            type: string
            official: boolean
            published_at: string
        }[]
    }
}