'use client'

import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import gsap from 'gsap'
import { Flip } from 'gsap/dist/Flip'
import { FaXmark } from 'react-icons/fa6'

import GenreFilter from '@/components/filters/GenreFilter'
import RatingsFilter from '@/components/filters/RatingsFilter'
import SortOptions from '@/components/filters/SortOptions'
import PaginatedList from '@/components/PaginatedList'
import MovieDetails from '@/components/MovieDetails'
import MovieDetailsSkeleton from '@/components/MovieDetailsSkeleton'

type Props = {
    setupData: MovieResponse
    genres: Genre[]
    region: string
}

export default function MovieList({ setupData, genres, region }: Props)
{
    const [data, setData] = useState<MovieResponse>(setupData)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)

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

        if (!isLoading)
        {
            setIsLoading(true)
        }

        // disable { behiviour: 'smooth' } for gsap animations to work
        // if not it will stagger from the bottom of the page
        viewRef.current?.scrollIntoView()

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
            setIsLoading(false)
        }
    }

    const handlePageNumberChanged = async (targetPage: number) =>
    {
        updatePageData(targetPage)
    }

    const handleOpenDialog = (movieId: number) =>
    {
        gsap.set('.modal-backdrop', {
            yPercent: 0,
            onComplete: () =>
            {
                gsap.to('.modal-backdrop', {
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power4.in'
                })
            }
        })
        gsap.to('.modal-contents', {
            yPercent: 0,
            duration: 0.8,
            ease: 'power4.out'
        })

        axios.get(`/api/movies/${movieId}`)
            .then(res => res.data)
            .then(data => setMovieDetails(data))
            .catch(() =>
            {
                toast.error('Please try again.')
                handleCloseDialog()
            })
    }

    const handleCloseDialog = () =>
    {
        gsap.to('.modal-backdrop', {
            opacity: 0,
            duration: 0.4,
            ease: 'power4.in',
            onComplete: () =>
            {
                gsap.set('.modal-backdrop', { yPercent: 100 })
            }
        })
        gsap.to('.modal-contents', {
            yPercent: 100,
            duration: 0.4,
            ease: 'power4.in',
            onComplete: () => setMovieDetails(null)
        })
    }

    useEffect(() =>
    {
        gsap.registerPlugin(Flip)

        gsap.set('.modal-backdrop', { opacity: 0, yPercent: 100 })
        gsap.set('.modal-contents', { yPercent: 100, opacity: 1 })
    }, [])

    return <div ref={viewRef}>

        <div className=''>

            <div className='space-y-4'>
                <GenreFilter
                    genres={genres}
                    onChange={handleGenresUpdated}
                />

                <RatingsFilter onChange={handleRatingsUpdated} />

                <SortOptions onChange={handleSortingUpdated} />
            </div>

            <PaginatedList
                data={data.movies}
                currentPage={currentPage}
                totalPages={data.totalPages}
                genres={genres}
                onPageChange={handlePageNumberChanged}
                showSkeleton={isLoading}
                onClick={handleOpenDialog}
            />
        </div>

        {/* Modal backdrop */}
        <div
            onClick={handleCloseDialog}
            className='modal-backdrop w-screen h-screen fixed inset-0 z-10 bg-black/50 backdrop-blur-sm opacity-0'
        />

        {/* Modal contents */}
        <div className='modal-contents w-screen max-w-screen-md mx-auto h-screen fixed inset-0 z-20 opacity-0'>
            {/* Close modal */}
            <div className='mt-[5vh] w-full text-center z-20'>
                <button
                    type='button'
                    className='border-2 border-white/30 bg-amber-400 rounded-t-full p-2 outline-none focus:outline-none'
                    onClick={handleCloseDialog}
                >
                    <FaXmark className='text-gray-900 w-6 h-6' />
                </button>
            </div>

            {/* Model contents */}
            <div className='relative bg-gray-950 w-screen max-w-screen-md mx-auto min-h-screen border-x-2 border-t-2 border-white/50'>
                {
                    movieDetails
                        ? <MovieDetails movie={movieDetails} />
                        : <MovieDetailsSkeleton />
                }
            </div>

        </div>

    </div>
}