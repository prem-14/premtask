// MoviesList.js
import React, { useContext, useEffect, useState } from 'react'
import MovieDetail from './MovieDetail'
import movieContext from '../context/movie/movieContext'

const MoviesList = () => {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const { all_movies, single_movie, cache_movie, getAllMovies, getSingleMovie } = useContext(movieContext)

  useEffect(() => {
    getAllMovies()
  }, [])

  useEffect(() => {
    console.log(single_movie, 'single_movie')
    setSelectedMovie(single_movie)
  }, [single_movie])

  const handleMovieClick = async (movieId) => {
    if (cache_movie[movieId]) {
      setSelectedMovie(cache_movie[movieId])
    } else {
      getSingleMovie(movieId)
    }
    setIsOpen(true)
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4'>Movies List</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {all_movies?.length
          ? all_movies.map((movie) => (
              <div key={movie._id} className='bg-white rounded-md shadow-lg p-4 border border-gray-300'>
                {movie.backdrop_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className='w-full h-40 object-cover mb-4 rounded-md'
                  />
                )}
                <h2 className='text-xl font-bold mb-2'>{movie.title}</h2>
                <p className='text-gray-600 h-14 overflow-hidden line-clamp-3'>{movie.overview}</p>
                <p className='text-gray-500 mt-2'>Released: {movie.release_date}</p>
                <p className='text-gray-700 mt-4'>Popularity: {movie.popularity}</p>
                <button
                  onClick={() => handleMovieClick(movie._id)}
                  className='mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600'
                >
                  View Details
                </button>
              </div>
            ))
          : null}
      </div>

      <MovieDetail selectedMovie={selectedMovie} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default MoviesList
