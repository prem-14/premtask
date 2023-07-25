import MoviesList from './Component/MovieList'
import MovieState from './context/movie/movieState'

function App() {
  return (
    <MovieState>
      <MoviesList />
    </MovieState>
  )
}

export default App
