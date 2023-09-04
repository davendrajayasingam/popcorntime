import { headers } from 'next/headers'

import { getGenres, getMovies } from '@/utils/helpers/tmdbApiHelper'
import MovieList from '@/components/MovieList'

export default async function HomePage() 
{
  const region = headers().get('x-pt-country')!

  const [movies, genres] = await Promise.all([
    getMovies(),
    getGenres()
  ])

  return <div className='p-4'>
    <MovieList
      setupData={movies}
      genres={genres}
      region={region}
    />
  </div>
}