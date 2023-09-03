import { classNames } from '@/utils/helpers/tailwindHelper'
import { cleanupSearchParams, reconstructSearchParams } from '@/utils/helpers/util'
import Link from 'next/link'
import { FaArrowDownWideShort, FaArrowUpShortWide } from 'react-icons/fa6'

type Props = {
    searchParams: SearchParams
}

export const sortOptions: SortOption[] = [
    {
        label: 'Popularity',
        order: 'desc',
        value: 'pd',
        param: 'popularity.desc'
    },
    {
        label: 'Popularity',
        order: 'asc',
        value: 'pa',
        param: 'popularity.asc'
    },
    {
        label: 'Rating',
        order: 'desc',
        value: 'vd',
        param: 'vote_average.desc'
    },
    {
        label: 'Rating',
        order: 'asc',
        value: 'va',
        param: 'vote_average.asc'
    },
    {
        label: 'Release Date',
        order: 'desc',
        value: 'rd',
        param: 'release_date.desc'
    },
    {
        label: 'Release Date',
        order: 'asc',
        value: 'ra',
        param: 'release_date.asc'
    },
    {
        label: 'Title',
        order: 'desc',
        value: 'td',
        param: 'title.desc'
    },
    {
        label: 'Title',
        order: 'asc',
        value: 'ta',
        param: 'title.asc'
    }
]

export default function Sorter({ searchParams }: Props)
{
    const currentSorting: SortOption = sortOptions.find(sortOption => sortOption.value === searchParams.s) ?? sortOptions[0]

    const rebuildSearchParams = (buttonName: string): string =>
    {
        let updatedSearchParams = reconstructSearchParams(searchParams)

        // remove the old search param
        updatedSearchParams = updatedSearchParams.replace(`&s=${currentSorting.value}`, '')

        // add the new search param
        const nextSort = sortOptions.filter(sortOption =>
            sortOption.label === buttonName // make sure the sort option is for the button we clicked
            && (
                sortOption.label === currentSorting.label // if the label is the same, we want to toggle the order
                    ? sortOption.order !== currentSorting.order // if the order is the same, toggle it
                    : true // if the label is different, we don't care about the order
            ))[0]
        updatedSearchParams += `&s=${nextSort.value}`

        return cleanupSearchParams(updatedSearchParams)
    }

    const buttonNames = ['Popularity', 'Rating', 'Release Date', 'Title']

    return <div className='mb-8 max-w-screen-xl mx-auto'>

        <p className='font-bold text-lg text-white'>
            Sort
        </p>

        <div className='mt-2 flex flex-wrap gap-4'>
            {
                buttonNames.map(buttonName => <Link
                    key={buttonName}
                    href={`/${rebuildSearchParams(buttonName)}`}
                    className={classNames(
                        currentSorting.label === buttonName ? 'bg-amber-400 text-gray-900' : 'bg-gray-800 text-white',
                        'rounded-lg px-4 py-2',
                        'font-semibold text-sm',
                        'flex flex-row items-center space-x-1'
                    )}
                >
                    <span>{buttonName}</span>
                    {
                        currentSorting.label === buttonName && currentSorting.order === 'desc'
                            ? <FaArrowDownWideShort />
                            : currentSorting.label === buttonName && currentSorting.order === 'asc'
                                ? <FaArrowUpShortWide />
                                : null
                    }
                </Link>)
            }
        </div>

    </div>
}