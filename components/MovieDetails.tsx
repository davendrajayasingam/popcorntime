import Image from 'next/image'
import { FaImage, FaStar } from 'react-icons/fa6'
import ReactPlayer from 'react-player'

import { formatMinutesToHoursAndMinutes, prettyDate } from '@/utils/helpers/timeHelper'
import { classNames } from '@/utils/helpers/tailwindHelper'

type Props = {
    movie: MovieDetails
}

export default function MovieDetails({ movie }: Props)
{
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    const video = movie.videos.results.find(video => video.site === 'YouTube' && video.type === 'Trailer')

    return <div className='absolute inset-0 overflow-x-hidden overflow-y-scroll'>

        {/* Backdrop */}
        {
            (movie.backdrop_path || movie.poster_path)
            && <div className='aspect-video overflow-hidden relative'>
                <Image
                    src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path || movie.poster_path}`}
                    alt={movie.title}
                    width={1280}
                    height={300}
                    className='object-cover object-center'
                />
                {
                    video
                    && <div className='absolute inset-0'>
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${video.key}`}
                            width={'100%'}
                            height={'100%'}
                            config={{
                                youtube: {
                                    playerVars: {
                                        autoplay: 1
                                    }
                                }
                            }}
                        />
                    </div>
                }
            </div>
        }

        <div className='p-6 flex flex-col space-y-6'>

            {/* Title */}
            <p className='font-bold text-amber-400 text-3xl'>
                {movie.title}
            </p>

            {/* Release date */}
            <p className='font-light text-white/80 text-xl'>
                {/* Using this instead of date-fns because: date-fns throws an error for dates before Jan 1, 1970 */}
                {prettyDate(new Date(movie.release_date))}
            </p>

            {/* Summary */}
            <p className='font-light text-white/50 text-xl'>
                {movie.overview}
            </p>

            {/* Genres */}
            <div>
                <p className='font-semibold text-white/80 text-xl'>
                    Genre
                </p>
                <div className='mt-2 flex flex-wrap gap-2'>
                    {movie.genres.map(genre => <p
                        key={`movie-details-${movie.id}-genre-${genre.id}`}
                        className='border border-white/50 p-1 text-xl text-white/50'
                    >
                        {genre.name}
                    </p>)}
                </div>
            </div>

            {/* Ratings */}
            <div>
                <p className='font-semibold text-white/80 text-xl'>
                    Rating
                </p>
                <p className='mt-2 font-light text-white/50 text-xl'>
                    {movie.vote_count} vote{movie.vote_count !== 1 && 's'}
                </p>
                <div className='mt-2 flex flex-row items-center space-x-1'>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rating => <div key={`rating-${rating}`}>
                            <FaStar className={classNames(
                                'w-7 h-7',
                                rating <= movie.vote_average ? 'text-amber-400' : 'text-gray-800',
                            )} />
                            <p className='font-bold text-white text-xs text-center'>
                                {rating}
                            </p>
                        </div>)
                    }
                </div>
            </div>

            {/* Runtime */}
            {
                movie.runtime
                && <div>
                    <p className='font-semibold text-white/80 text-xl'>
                        Runtime
                    </p>
                    <div className='text-xl text-white/50'>
                        {formatMinutesToHoursAndMinutes(movie.runtime)}
                    </div>
                </div>
            }

            {/* Cast */}
            {
                movie.credits.cast.length > 0
                && <div>
                    <p className='font-semibold text-white/80 text-xl'>
                        Cast
                    </p>
                    <div className='mt-2 grid grid-cols-2 sm:grid-cols-3 gap-6'>
                        {
                            movie.credits.cast.map(cast => <div
                                key={`movie-details-${movie.id}-cast-${cast.id}`}
                                className='bg-gray-800 rounded-xl h-full'
                            >
                                {
                                    cast.profile_path
                                        ? <div className='relative overflow-hidden aspect-[2/3]'>
                                            <Image
                                                src={`https://image.tmdb.org/t/p/h632/${cast.profile_path}`}
                                                alt={cast.name}
                                                fill
                                                sizes='632px'
                                                className='rounded-t-xl object-cover'
                                            />
                                        </div>
                                        : <div className='bg-gray-700 aspect-[2/3] w-full rounded-t-xl relative'>
                                            <div className='absolute inset-0 flex items-center justify-center'>
                                                <FaImage className='text-gray-800 w-1/4 h-auto' />
                                            </div>
                                        </div>
                                }
                                <p className='mt-1 font-semibold text-white/80 text-lg text-center'>
                                    {cast.name}
                                </p>
                                <p className='mb-2 font-light text-white/50 text-center'>
                                    {cast.character}
                                </p>
                            </div>)
                        }
                    </div>
                </div>
            }

            {/* Budget */}
            {
                movie.budget
                && <div>
                    <p className='font-semibold text-white/80 text-xl'>
                        Budget
                    </p>
                    <div className='text-xl text-white/50'>
                        {currencyFormatter.format(movie.budget)}
                    </div>
                </div>
            }

            {/* Budget */}
            {
                movie.revenue
                && <div>
                    <p className='font-semibold text-white/80 text-xl'>
                        Revenue
                    </p>
                    <div className='text-xl text-white/50'>
                        {currencyFormatter.format(movie.revenue)}
                    </div>
                </div>
            }

        </div>

        <div className='h-[10vh]' />

    </div>
}