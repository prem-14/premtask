import React, { useReducer } from 'react'
import MovieContext from './movieContext'
import MovieReducer from './movieReducer'
import { CACHE_MOVIE, CLEAR_SINGLE_MOVIE, GET_ALL_MOVIES, GET_SINGLE_MOVIE } from './movieTypes'

const MovieState = (props) => {
  const initialState = {
    single_movie: null,
    all_movies: [],
    cache_movie: {},
  }

  const [state, dispatch] = useReducer(MovieReducer, initialState)

  const getAllMovies = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/movies`)
      const data = await response.json()

      dispatch({
        type: GET_ALL_MOVIES,
        payload: data,
      })
    } catch (error) {
      console.error('Error fetching movie details:', error)
    }
  }

  const getSingleMovie = async (movieId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/movies/${movieId}`)
      const data = await response.json()

      dispatch({
        type: GET_SINGLE_MOVIE,
        payload: data,
      })

      dispatch({
        type: CACHE_MOVIE,
        payload: data,
      })
    } catch (error) {
      console.error('Error fetching movie details:', error)
    }
  }

  const clearSingleMovie = async () => {
    dispatch({
      type: CLEAR_SINGLE_MOVIE,
    })
  }

  return (
    <MovieContext.Provider value={{ ...state, getAllMovies, getSingleMovie, clearSingleMovie }}>
      {props.children}
    </MovieContext.Provider>
  )
}

export default MovieState
