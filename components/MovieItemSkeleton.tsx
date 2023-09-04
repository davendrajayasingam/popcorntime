import { FaImage, FaStar } from 'react-icons/fa6'

export default function MovieItemSkeleton()
{
    return (
        <div className='bg-gray-800 rounded-xl animate-pulse'>

            {/* Poster */}
            <div className='bg-gray-700 aspect-[2/3] w-full rounded-t-xl relative'>
                <div className='absolute inset-0 flex items-center justify-center'>
                    <FaImage className='text-gray-800 w-1/4 h-auto' />
                </div>
            </div>

            <div className='flex flex-col space-y-2 p-4'>

                {/* Rating */}
                <div className='-mt-12 -ml-3 z-10 flex flex-row items-end'>
                    <FaStar className='w-14 h-14 text-gray-700' />
                    <div className='h-3 bg-gray-700 rounded w-1/4' />
                </div>

                {/* Title */}
                <div className='h-6 bg-gray-700 rounded w-5/6' />

                {/* Release date */}
                <div className='h-4 bg-gray-700 rounded w-1/2' />

                {/* Genres */}
                <div className='grid grid-cols-3 gap-2'>
                    <div className='h-6 bg-gray-700 rounded' />
                    <div className='h-6 bg-gray-700 rounded' />
                    <div className='h-6 bg-gray-700 rounded' />
                </div>

                {/* Summary */}
                <div className='flex flex-col space-y-2'>
                    <div className='h-2 bg-gray-700 rounded' />
                    <div className='h-2 bg-gray-700 rounded' />
                    <div className='h-2 bg-gray-700 rounded' />
                </div>

            </div>

        </div>
    )
}