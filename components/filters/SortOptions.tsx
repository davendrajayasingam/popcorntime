import { useState } from 'react'
import { FaArrowDownWideShort, FaArrowUpShortWide } from 'react-icons/fa6'

import { classNames } from '@/utils/helpers/tailwindHelper'
import { sortOptions } from '@/utils/helpers/project'

type Props = {
    onChange: (selectedSortingValue: string) => void
}

export default function SortOptions({ onChange }: Props)
{
    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(sortOptions[0])

    const buttonNames = ['Popularity', 'Rating', 'Release Date', 'Title']

    const handleSortOptionSelected = (buttonName: string) =>
    {
        if (selectedSortOption.label === buttonName)
        {
            if (selectedSortOption.order === 'desc')
            {
                setSelectedSortOption(sortOptions.find(sortOption => sortOption.label === buttonName && sortOption.order === 'asc')!)
                onChange(sortOptions.find(sortOption => sortOption.label === buttonName && sortOption.order === 'asc')!.value)
            }
            else
            {
                setSelectedSortOption(sortOptions.find(sortOption => sortOption.label === buttonName && sortOption.order === 'desc')!)
                onChange(sortOptions.find(sortOption => sortOption.label === buttonName && sortOption.order === 'desc')!.value)
            }
        }
        else
        {
            setSelectedSortOption(sortOptions.find(sortOption => sortOption.label === buttonName && sortOption.order === 'desc')!)
            onChange(sortOptions.find(sortOption => sortOption.label === buttonName && sortOption.order === 'desc')!.value)
        }
    }

    return <div className='max-w-screen-xl mx-auto'>

        <p className='font-bold sm:text-lg text-white'>
            Sort
        </p>

        <div className='mt-2 flex flex-wrap gap-2 sm:gap-4'>
            {
                buttonNames.map(buttonName => <button
                    key={buttonName}
                    className={classNames(
                        selectedSortOption.label === buttonName ? 'bg-amber-400 text-gray-900' : 'bg-gray-800 text-white',
                        'rounded-lg px-3 sm:px-4 py-2',
                        'font-semibold text-xs sm:text-sm',
                        'flex flex-row items-center sm:space-x-1'
                    )}
                    onClick={() => handleSortOptionSelected(buttonName)}
                >
                    <span>{buttonName}</span>
                    {
                        selectedSortOption.label === buttonName && selectedSortOption.order === 'desc'
                            ? <FaArrowDownWideShort />
                            : selectedSortOption.label === buttonName && selectedSortOption.order === 'asc'
                                ? <FaArrowUpShortWide />
                                : null
                    }
                </button>)
            }
        </div>

    </div>
}