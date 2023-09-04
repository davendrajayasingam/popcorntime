import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6'

import MovieItem from '@/components/MovieItem'
import { classNames } from '@/utils/helpers/tailwindHelper'
import MovieSkeleton from './MovieSkeleton'

type Props = {
  data: Movie[]
  currentPage: number
  totalPages: number
  genres: Genre[]
  onPageChange: (page: number) => void
  showSkeleton: boolean
}

export default function PaginatedList({ data, currentPage, totalPages, genres, onPageChange, showSkeleton }: Props)
{
  const startingPage = Math.max(currentPage - 2 - (totalPages - currentPage < 2 ? 2 - (totalPages - currentPage) : 0), 1)
  const endingPage = Math.min(startingPage + 4, totalPages)
  const pages = Array.from({ length: endingPage - startingPage + 1 }, (_, i) => i + startingPage)

  const PaginationButton = ({ target, children }: { target: number, children: React.ReactNode }) => <button
    type='button'
    className={classNames(
      'font-semibold',
      currentPage === target ? 'bg-amber-400 text-gray-900' : 'bg-gray-800 hover:bg-amber-400 text-white rounded-[50px] hover:rounded-none',
      'w-10 h-10 flex items-center justify-center',
      'transition-all duration-300 ease-in-out',
      'outline-none focus:outline-none'
    )}
    onClick={() => onPageChange(target)}
  >
    {children}
  </button>

  const Pagination = () => (
    <div className='flex flex-row items-center justify-center space-x-2'>

      {/* First page button */}
      <div className={classNames(
        currentPage >= 4 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}>
        <PaginationButton target={1}>
          <FaAnglesLeft />
        </PaginationButton>
      </div>

      {/* Page numbering */}
      {
        pages.map(pageNumber => <PaginationButton
          key={`page-number-${pageNumber}`}
          target={pageNumber}
        >
          {pageNumber}
        </PaginationButton>)
      }

      {/* Last page button */}
      <div className={classNames(
        currentPage <= (totalPages - 4) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}>
        <PaginationButton target={totalPages}>
          <FaAnglesRight />
        </PaginationButton>
      </div>

    </div>
  )

  return <div className='py-8 max-w-screen-xl mx-auto'>

    {/* Top pagination */}
    {totalPages > 1 && <Pagination />}

    {/* List of movies */}
    <div className='my-4 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4'>
      {
        data.map(movie => showSkeleton
          ? <MovieSkeleton key={movie.id} />
          : <MovieItem
            key={movie.id}
            movie={movie}
            genres={genres}
          />)
      }
    </div>

    {/* Bottom pagination */}
    {totalPages > 1 && <Pagination />}

    {/* Text when there are no results */}
    {
      data.length === 0
      && <p className='text-white/50 text-center my-8 p-8 border border-dashed border-white/50 rounded-xl'>
        No movies found.
      </p>
    }

  </div>
}