'use client'

import { useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import GenreFilter from '@/components/filters/GenreFilter'
import RatingsFilter from '@/components/filters/RatingsFilter'
import SortOptions from '@/components/filters/SortOptions'
import PaginatedList from '@/components/PaginatedList'

type Props = {
    setupData: MovieResponse
    genres: Genre[]
    region: string
}

export default function MovieList({ setupData, genres, region }: Props)
{
    const [data, setData] = useState<MovieResponse>(setupData)
    const [currentPage, setCurrentPage] = useState<number>(1)

    const viewRef = useRef<HTMLDivElement>(null)

    const genreIdRef = useRef<number[]>([])
    const handleGenresUpdated = (updatedGenreIds: number[]) =>
    {
        genreIdRef.current = updatedGenreIds
        updatePageData()
    }

    const ratingIdRef = useRef<number>(0)
    const handleRatingsUpdated = (updatedRating: number) =>
    {
        ratingIdRef.current = updatedRating
        updatePageData()
    }

    const sortParamRef = useRef<string>('popularity.desc')
    const handleSortingUpdated = (updatedSortParam: string) =>
    {
        sortParamRef.current = updatedSortParam
        updatePageData()
    }

    const queryCounterRef = useRef<number>(0)

    const updatePageData = async (targetPage: number = 1) =>
    {
        const queryId = ++queryCounterRef.current

        const response: MovieResponse | null = await axios.post('/api/movies', {
            page: targetPage,
            genreIds: genreIdRef.current,
            rating: ratingIdRef.current,
            sortedBy: sortParamRef.current
        } as MovieQuery)
            .then(res => res.data)
            .catch(() =>
            {
                toast.error('Please try again.')
                return null
            })

        if (response && queryCounterRef.current === queryId)
        {
            setData(response)
            setCurrentPage(targetPage)
            viewRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handlePageNumberChanged = async (targetPage: number) =>
    {
        updatePageData(targetPage)
    }

    return <div
        ref={viewRef}
        className='space-y-4'
    >

        <GenreFilter
            genres={genres}
            onChange={handleGenresUpdated}
        />

        <RatingsFilter onChange={handleRatingsUpdated} />

        <SortOptions onChange={handleSortingUpdated} />

        <PaginatedList
            data={data.movies}
            currentPage={currentPage}
            totalPages={data.totalPages}
            genres={genres}
            onPageChange={handlePageNumberChanged}
        />

    </div>
}