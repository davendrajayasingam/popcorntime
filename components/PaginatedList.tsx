import Link from 'next/link'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

import Movie from '@/components/Movie'
import { classNames } from '@/utils/helpers/tailwindHelper'
import { getSearchParams } from '@/utils/helpers/util'

type Props = {
  data: MovieResponse
  currentPage: number
  searchParams: SearchParams
}

export default function PaginatedList({ data, currentPage, searchParams }: Props)
{
  const { movies, totalPages } = data

  const startingPage = Math.max(currentPage - 2 - (totalPages - currentPage < 2 ? 2 - (totalPages - currentPage) : 0), 1)
  const endingPage = Math.min(startingPage + 4, totalPages)
  const pages = Array.from({ length: endingPage - startingPage + 1 }, (_, i) => i + startingPage)

  const PaginationLink = ({ href, page, children }: { href: string, page: number, children: React.ReactNode }) => <Link
    href={href}
    className={classNames(
      'font-semibold',
      currentPage === page ? 'bg-amber-400 text-gray-900' : 'bg-gray-800 hover:bg-amber-400 text-white rounded-[50px] hover:rounded-none',
      'w-10 h-10 flex items-center justify-center',
      'transition-all duration-300 ease-in-out'
    )}
  >
    {children}
  </Link>

  return <div className='max-w-screen-xl mx-auto'>

    {/* List */}
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
      {
        movies.map(movie => <Movie
          key={movie.id}
          movie={movie}
        />)
      }
    </div>

    {
      movies.length === 0
      && <p className='text-white text-center mt-8'>
        No movies found.
      </p>
    }

    {/* Pagination */}
    {
      totalPages > 1
      && <div className='mt-8 flex flex-row items-center justify-center space-x-2'>

        <div className={classNames(
          currentPage === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto',
        )}>
          <PaginationLink
            href={`/p/${currentPage - 1}${getSearchParams(searchParams)}`}
            page={currentPage - 1}
          >
            <FaChevronLeft />
          </PaginationLink>
        </div>

        {
          pages.map(page => <PaginationLink
            key={`pagination-${page}`}
            href={`/p/${page}${getSearchParams(searchParams)}`}
            page={page}
          >
            {page}
          </PaginationLink>)
        }

        <div className={classNames(
          currentPage === totalPages ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto',
        )}>
          <PaginationLink
            href={`/p/${currentPage + 1}${getSearchParams(searchParams)}`}
            page={currentPage + 1}
          >
            <FaChevronRight />
          </PaginationLink>
        </div>

      </div>
    }

  </div>
}