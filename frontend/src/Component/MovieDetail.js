import React, { useContext } from 'react'
import movieContext from '../context/movie/movieContext'

const MovieDetail = ({ selectedMovie, isOpen, setIsOpen }) => {
  const { clearSingleMovie } = useContext(movieContext)

  return (
    <>
      {isOpen && selectedMovie && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-md shadow-lg max-w-lg'>
            {selectedMovie.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
                alt={selectedMovie.title}
                className='w-full h-40 object-cover mb-4 rounded-md'
              />
            )}
            <h2 className='text-xl font-bold mb-2'>{selectedMovie.title}</h2>
            <p className='text-gray-600 mb-4'>{selectedMovie.overview}</p>
            <p className='text-gray-500'>Released: {selectedMovie.release_date}</p>
            <p className='text-gray-700 mt-2'>Popularity: {selectedMovie.popularity}</p>
            <button
              onClick={() => {
                setIsOpen(false)
                clearSingleMovie()
              }}
              className='mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default MovieDetail
