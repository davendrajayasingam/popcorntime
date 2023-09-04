import Image from 'next/image'
import { FaImage, FaStar } from 'react-icons/fa6'

import { prettyDate } from '@/utils/helpers/timeHelper'
import { classNames } from '@/utils/helpers/tailwindHelper'

type Props = {
    movie: Movie,
    genres: Genre[],
    onClick: () => void
}

export default function MovieItem({ movie, genres, onClick }: Props)
{
    return (
        <div className=' bg-gray-800 rounded-xl h-full'>

            {/* Poster */}
            {
                movie.poster_path
                    ? <div className='relative overflow-hidden aspect-[2/3]'>
                        <button
                            type='button'
                            onClick={onClick}
                        >
                            <Image
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                                fill
                                sizes='500px'
                                className='rounded-t-xl object-cover hover:scale-110 transition-all duration-1000 ease-in-out'
                            />
                        </button>
                    </div>
                    : <div className='bg-gray-700 aspect-[2/3] w-full rounded-t-xl relative'>
                        <button
                            type='button'
                            className='absolute inset-0 flex items-center justify-center'
                            onClick={onClick}
                        >
                            <FaImage className='text-gray-800 w-1/4 h-auto' />
                        </button>
                    </div>
            }

            <div className='flex flex-col space-y-2 p-4'>

                {/* Rating */}
                <div className='-mt-12 -ml-3 z-10 flex flex-row items-end'>
                    <div className='relative'>
                        <FaStar className='w-14 h-14 text-amber-400' />
                        <p className='mt-1 absolute inset-0 flex items-center justify-center font-bold text-sm text-gray-900 text-center'>
                            {movie.vote_average}
                        </p>
                    </div>
                    <p className='text-xs text-white'>
                        {movie.vote_count} vote{movie.vote_count !== 1 && 's'}
                    </p>
                </div>

                {/* Title */}
                <p className='font-bold text-amber-400 text-sm sm:text-lg'>
                    <button
                        type='button'
                        className='text-left'
                        onClick={onClick}
                    >
                        {movie.title}
                    </button>
                </p>

                {/* Release date */}
                <p className='text-white text-xs sm:text-sm'>
                    {/* Using this instead of date-fns because: date-fns throws an error for dates before Jan 1, 1970 */}
                    {prettyDate(new Date(movie.release_date))}
                </p>

                {/* Genres */}
                <div className='hidden sm:block'>
                    <div className='flex flex-wrap gap-2'>
                        {movie.genre_ids.map(genreId => <p
                            key={`movie-${movie.id}-genre-${genreId}`}
                            className='border border-white/50 p-1 text-xs text-white/50'
                        >
                            {genres.find(genre => genre.id === genreId)?.name}
                        </p>)}
                    </div>
                </div>

                {/* Summary */}
                <div className='hidden sm:block'>
                    <p className='font-light text-white/50 text-sm text-justify line-clamp-3'>
                        {movie.overview}
                    </p>
                </div>

                {/* View more button */}
                <div className='pt-2 flex'>
                    <button
                        type='button'
                        className={classNames(
                            'bg-white/80 px-4 py-1 font-semibold text-gray-900 text-sm text-left',
                            'hover:bg-amber-400 hover:text-gray-900',
                            'rounded-xl outline-none focus:outline-none',
                            'transition-all duration-300 ease-in-out',
                        )}
                        onClick={onClick}
                    >
                        View More
                    </button>
                </div>

            </div>

        </div>
    )
}