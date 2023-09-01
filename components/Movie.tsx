import Image from 'next/image'
import { format } from 'date-fns'

import placeholder from '@/components/images/placeholder.png'

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
                    />
            }

            <div className='flex flex-col space-y-2 p-4'>

                <p className='font-bold text-amber-400 text-lg'>
                    {movie.title}
                </p>

                <p className='text-white'>
                    {format(new Date(movie.release_date), 'EEE, do MMM yyyy')}
                </p>

                <p className='font-light text-white/50 text-sm text-justify line-clamp-3'>
                    {movie.overview}
                </p>

            </div>

        </div>
    )
}