import { getMovies } from "../lib/mongo/movies"
// import styles from './page.module.css';

async function fetchMovies() {
  const {movies} = await getMovies();
  if (!movies) throw new Error('Failed to fetch movies!')

  return movies 
}

export default async function Home() {
  const movies = await fetchMovies()

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>{movie.title}</li>
        )) }
      </ul>
    </div>
  )
}
