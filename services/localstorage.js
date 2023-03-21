const key = 'favoriteMovies'

function getFavorites() {
  return JSON.parse(localStorage.getItem(key))
}

function setFavorite(movie){
  const movies = getFavorites() || []
  movies.push(movie)
  const moviesJSON = JSON.stringify(movies)
  localStorage.setItem(key, moviesJSON)
}

function removeFavorite(id) {
  const movies = getFavorites() || []
  const thisMovie = movies.find(movie => movie.id == id)
  const newMovies = movies.filter(movie => movie.id != thisMovie.id)
  localStorage.setItem(key, JSON.stringify(newMovies)) 
}

function checkIfIsFavorite(id) {
  const movies = getFavorites() || []
  return movies.find(movie => movie.id == id)
}

export const LocalStorage = {
  getFavorites,
  setFavorite,
  removeFavorite,
  checkIfIsFavorite
}
