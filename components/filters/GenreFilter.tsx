import Link from 'next/link'

import { classNames } from '@/utils/helpers/tailwindHelper'
import { cleanupSearchParams, reconstructSearchParams } from '@/utils/helpers/util'

type Props = {
    genres: Genre[]
    searchParams: SearchParams
}

export default function GenreFilter({ genres, searchParams }: Props)
{
    const rebuildSearchParams = (selectedGenre: string): string =>
    {
        let updatedSearchParams = reconstructSearchParams(searchParams)

        // add the new search param or remove it if it already exists
        const selectedGenreParam = `&g=${selectedGenre}`
        if (updatedSearchParams.includes(selectedGenreParam))
        {
            updatedSearchParams = updatedSearchParams.replace(selectedGenreParam, '')
        }
        else
        {
            updatedSearchParams += selectedGenreParam
        }

        return cleanupSearchParams(updatedSearchParams)
    }

    return <div className='mb-8 max-w-screen-xl mx-auto'>

        <p className='font-bold text-lg text-white'>
            Genres
        </p>

        <div className='mt-2 flex flex-wrap gap-4'>
            {
                genres.map(genre => <Link
                    key={genre.id}
                    href={`/${rebuildSearchParams(`${genre.id}`)}`}
                    className={classNames(
                        (Array.isArray(searchParams.g) && searchParams.g.includes(`${genre.id}`)) || searchParams.g === `${genre.id}` ? 'bg-amber-400 text-gray-900' : 'bg-gray-800 text-white',
                        'rounded-lg px-4 py-2',
                        'font-semibold text-sm'
                    )}
                >
                    {genre.name}
                </Link>)
            }
        </div>

    </div>
}