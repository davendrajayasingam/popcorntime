import Image from 'next/image'

import placeholder from '@/components/images/placeholder.png'
import { prettyDate } from '@/utils/helpers/timeHelper'

type Props = {
    movie: Movie
}

export default function Movie({ movie }: Props)
{
    return (
        <div className='bg-gray-800 rounded-xl'>

            {
                movie.poster_path
                    ? <div className='relative overflow-hidden aspect-[2/3]'>
                        <Image
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            fill
                            className='rounded-t-xl object-cover'
                        />
                    </div>
                    : <Image
                        src={placeholder}
                        alt={movie.title}
                        width={500}
                        height={750}
                        className='rounded-t-xl opacity-30'
                    />
            }

            {/* {
                movie.backdrop_path
                && <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                    alt={movie.title}
                />
            } */}

            <div className='flex flex-col space-y-2 p-4'>

                <p className='font-bold text-amber-400 text-lg'>
                    {movie.title}
                </p>

                <p className='text-white'>
                    {/* Using this instead of date-fns because: date-fns throws an error for dates before Jan 1, 1970 */}
                    {prettyDate(new Date(movie.release_date))}
                </p>

                <p className='font-light text-white/50 text-sm text-justify line-clamp-3'>
                    {movie.overview}
                </p>

            </div>

        </div>
    )
}