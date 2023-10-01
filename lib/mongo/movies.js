import clientPromise from "."

let client
let db
let movies

async function init() {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db()
    movies = await db.collection('movies')
  } catch (error) {
    throw new Error('Failed to establish connection to database')
  }
}

;(async () => {
  await init()
})()

export async function getMovies() {
  try {
    if (!movies) await init()
    const result = await movies
      .find({})
      .limit(20)
      .map(user => ({ ...user, _id: user._id.toString() }))
      .toArray()

      return { movies: result }
  } catch (error) {
    return { error: 'Failed to fetch movies!' }
  }
}






// export async function getMovies() {
//   try {
//     if (!movies) await init();

//     const result = await movies.find({}).toArray();

//     const formattedMovies = result.map(movie => ({
//       ...movie,
//       _id: movie._id.toString(),
//     }));

//     console.log('Fetched movies:', formattedMovies);  // Add this log statement

//     return { movies: formattedMovies };
//   } catch (error) {
//     console.error('Failed to fetch movies:', error.message);
//     return { error: 'Failed to fetch movies!' };
//   }
// }

// export async function getMovies() {
//   try {
//     if (!movies) await init();

//     const result = await movies.find({}).limit(20).toArray();

//     const formattedMovies = result.map(movie => ({
//       ...movie,
//       _id: movie._id.toString(),
//     }));

//     console.log('Fetched movies:', formattedMovies);  // Add this log statement

//     return { movies: formattedMovies };
//   } catch (error) {
//     console.error('Failed to fetch movies:', error.message);
//     return { error: 'Failed to fetch movies!' };
//   }
// }
