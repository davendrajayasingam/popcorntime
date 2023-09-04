import { useState } from 'react'
import { FaStar } from 'react-icons/fa6'

import { classNames } from '@/utils/helpers/tailwindHelper'

type Props = {
    onChange: (selectedRating: number) => void
}

export default function RatingsFilter({ onChange }: Props)
{
    const [selectedRating, setSelectedRating] = useState<number>(0)
    const [hoveredRating, setHoveredRating] = useState<number>(0)

    const handleRatingSelected = (rating: number) =>
    {
        if (rating === selectedRating)
        {
            setSelectedRating(0)
            onChange(0)
        }
        else
        {
            setSelectedRating(rating)
            onChange(rating)
        }
    }

    return <div className='max-w-screen-xl mx-auto'>

        <p className='font-bold sm:text-lg text-white'>
            Ratings
        </p>

        <div className='mt-2 flex flex-row items-center space-x-1'>
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rating => <button
                    key={`rating-${rating}`}
                    onClick={() => handleRatingSelected(rating)}
                    onMouseEnter={() => setHoveredRating(rating)}
                    onMouseLeave={() => setHoveredRating(0)}
                >
                    <FaStar className={classNames(
                        'w-7 sm:w-10 h-7 sm:h-10 cursor-pointer',
                        (hoveredRating !== 0 ? rating < hoveredRating : rating <= selectedRating) ? 'text-amber-400' : 'text-gray-800 hover:text-amber-400',
                        'transition-colors duration-300 ease-in-out'
                    )} />
                    <p className='font-medium text-white text-xs sm:text-base text-center'>
                        {rating}
                    </p>
                </button>)
            }
        </div>

    </div>
}