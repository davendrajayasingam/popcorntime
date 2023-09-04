import { useState } from 'react'

import { classNames } from '@/utils/helpers/tailwindHelper'

type Props = {
    genres: Genre[]
    onChange: (selectedGenreIds: number[]) => void
}

export default function GenreFilter({ genres, onChange }: Props)
{
    const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([])

    const handleGenreIdSelected = (genreId: number) =>
    {
        let newIds = [...selectedGenreIds]
        if (newIds.includes(genreId))
        {
            newIds = newIds.filter(id => id !== genreId)
        }
        else
        {
            newIds.push(genreId)
        }
        setSelectedGenreIds(newIds)
        onChange(newIds)
    }

    return <div className='max-w-screen-xl mx-auto'>

        <p className='font-bold sm:text-lg text-white'>
            Genres
        </p>

        <div className='mt-1 sm:mt-2 flex flex-wrap gap-x-1 gap-y-2 sm:gap-4'>
            {
                genres.map(genre => <button
                    key={genre.id}
                    type='button'
                    className={classNames(
                        selectedGenreIds.includes(genre.id) ? 'bg-amber-400 text-gray-900' : 'bg-gray-800 text-white',
                        'hover:bg-amber-400 hover:text-gray-900',
                        'rounded-lg px-2 sm:px-4 py-2',
                        'font-medium text-xs sm:text-sm',
                        'transition-all duration-300 ease-in-out',
                        'outline-none focus:outline-none'
                    )}
                    onClick={() => handleGenreIdSelected(genre.id)}
                >
                    {genre.name}
                </button>)
            }
        </div>

    </div>
}