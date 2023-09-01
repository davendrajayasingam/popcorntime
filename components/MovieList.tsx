import Movie from './Movie'

type Props = {
  movies: Movie[]
}

export default function MovieList({ movies }: Props)
{
  return <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-screen-xl mx-auto'>
    {
      movies.map(movie => <Movie
        key={movie.id}
        movie={movie}
      />)
    }
  </div>
}