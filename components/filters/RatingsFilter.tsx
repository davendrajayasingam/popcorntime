import Link from 'next/link'
import { FaStar } from 'react-icons/fa6'

import { classNames } from '@/utils/helpers/tailwindHelper'
import { cleanupSearchParams, reconstructSearchParams } from '@/utils/helpers/util'

type Props = {
    searchParams: SearchParams
}

export default function RatingsFilter({ searchParams }: Props)
{
    const rebuildSearchParams = (selectedRating: number): string =>
    {
        let updatedSearchParams = reconstructSearchParams(searchParams)

        // remove the old search param
        updatedSearchParams = updatedSearchParams.replace(`&r=${searchParams.r}`, '')

        // add the new search param
        if (searchParams.r !== `${selectedRating}`)
        {
            updatedSearchParams += `&r=${selectedRating}`
        }

        return cleanupSearchParams(updatedSearchParams)
    }

    return <div className='mb-8 max-w-screen-xl mx-auto'>

        <p className='font-bold text-lg text-white'>
            Ratings
        </p>

        <div className='mt-2 flex flex-row items-center space-x-1'>
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rating => <Link
                    key={`rating-${rating}`}
                    href={`/${rebuildSearchParams(rating)}`}
                >
                    <FaStar className={classNames(
                        'w-8 h-8 cursor-pointer',
                        rating <= Number(searchParams.r) ? 'text-amber-400' : 'text-gray-800 hover:text-amber-400',
                        'transition-colors duration-300 ease-in-out'
                    )} />
                    <p className='font-bold text-white text-xs text-center'>
                        {rating}
                    </p>
                </Link>)
            }
        </div>

    </div>
}