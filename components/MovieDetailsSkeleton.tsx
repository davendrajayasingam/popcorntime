import Image from 'next/image'
import { FaImage, FaStar } from 'react-icons/fa6'

import { formatMinutesToHoursAndMinutes, prettyDate } from '@/utils/helpers/timeHelper'
import { classNames } from '@/utils/helpers/tailwindHelper'

export default function MovieDetailsSkeleton()
{
    return <div className='absolute inset-0 overflow-x-hidden overflow-y-scroll animate-pulse'>

        {/* Backdrop */}
        <div className='bg-gray-700 aspect-video w-full rounded-t-xl relative'>
            <div className='absolute inset-0 flex items-center justify-center'>
                <FaImage className='text-gray-800 w-1/4 h-auto' />
            </div>
        </div>

        <div className='p-6 flex flex-col space-y-6'>

            {/* Title */}
            <div className='h-12 bg-gray-700 rounded w-3/4' />

            {/* Release date */}
            <div className='h-6 bg-gray-700 rounded w-1/2' />

            {/* Summary */}
            <div className='h-10 bg-gray-700 rounded w-1/2' />
            <div className='flex flex-col space-y-2'>
                <div className='h-6 bg-gray-700 rounded' />
                <div className='h-6 bg-gray-700 rounded' />
                <div className='h-6 bg-gray-700 rounded' />
            </div>

            {/* Genres */}
            <div className='h-10 bg-gray-700 rounded w-1/2' />
            <div className='grid grid-cols-3 gap-2'>
                <div className='h-10 bg-gray-700 rounded' />
                <div className='h-10 bg-gray-700 rounded' />
                <div className='h-10 bg-gray-700 rounded' />
            </div>

        </div>

        <div className='h-[10vh]' />

    </div>
}