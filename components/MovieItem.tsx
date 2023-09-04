import Image from 'next/image'
import { FaImage, FaStar } from 'react-icons/fa6'

import placeholder from '@/components/images/placeholder.png'
import { prettyDate } from '@/utils/helpers/timeHelper'

type Props = {
    movie: Movie,
    genres: Genre[]
}

export default function MovieItem({ movie, genres }: Props)
{
    return (
        <div className='bg-gray-800 rounded-xl'>

            {/* Poster */}
            {
                movie.poster_path
                    ? <div className='relative overflow-hidden aspect-[2/3]'>
                        <Image
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            fill
                            sizes='500px'
                            className='rounded-t-xl object-cover hover:scale-110 transition-all duration-1000 ease-in-out'
                        />
                    </div>
                    : <div className='bg-gray-700 aspect-[2/3] w-full rounded-t-xl relative'>
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <FaImage className='text-gray-800 w-1/4 h-auto' />
                        </div>
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
                <p className='font-bold text-amber-400 text-lg'>
                    {movie.title}
                </p>

                {/* Release date */}
                <p className='text-white text-sm'>
                    {/* Using this instead of date-fns because: date-fns throws an error for dates before Jan 1, 1970 */}
                    {prettyDate(new Date(movie.release_date))}
                </p>

                {/* Genres */}
                <div className='flex flex-wrap gap-2'>
                    {movie.genre_ids.map(genreId => <p
                        key={`movie-${movie.id}-genre-${genreId}`}
                        className='border border-white/50 p-1 text-xs text-white/50'
                    >
                        {genres.find(genre => genre.id === genreId)?.name}
                    </p>)}
                </div>

                {/* Summary */}
                <p className='font-light text-white/50 text-sm text-justify line-clamp-3'>
                    {movie.overview}
                </p>

            </div>

        </div>
    )
}