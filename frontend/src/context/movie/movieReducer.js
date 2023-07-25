import { GET_ALL_MOVIES, GET_SINGLE_MOVIE, CLEAR_SINGLE_MOVIE, CACHE_MOVIE } from './movieTypes'

const JobReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_MOVIES:
      return {
        ...state,
        all_movies: action.payload,
      }
    case GET_SINGLE_MOVIE:
      return {
        ...state,
        single_movie: action.payload,
      }
    case CLEAR_SINGLE_MOVIE:
      return {
        ...state,
        single_movie: null,
      }
    case CACHE_MOVIE:
      return {
        ...state,
        cache_movie: { ...state.cache_movie, [action.payload._id]: action.payload },
      }

    default:
      return state
  }
}

export default JobReducer
