import Link from 'next/link'

import { classNames } from '@/utils/helpers/tailwindHelper'
import { cleanupSearchParams, reconstructSearchParams } from '@/utils/helpers/util'

type Props = {
    genres: Genre[]
    searchParams: SearchParams
}

export default function GenreFilter({ genres, searchParams }: Props)
{
    const rebuildSearchParams = (key: string, newParam: string): string =>
    {
        let newSearchParams = reconstructSearchParams(searchParams)

        // add the new search param or remove it if it already exists
        const selectedKVP = `&${key}=${newParam}`
        if (newSearchParams.includes(selectedKVP))
        {
            newSearchParams = newSearchParams.replace(selectedKVP, '')
        }
        else
        {
            newSearchParams += selectedKVP
        }

        return cleanupSearchParams(newSearchParams)
    }

    return <div className='mb-8 max-w-screen-xl mx-auto'>

        <p className='font-bold text-lg text-white'>
            Genres
        </p>

        <div className='mt-2 flex flex-wrap gap-4'>
            {
                genres.map(genre => <Link
                    key={genre.id}
                    href={`/${rebuildSearchParams('g', `${genre.id}`)}`}
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