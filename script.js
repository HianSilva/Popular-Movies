import { LocalStorage } from "./services/localstorage.js"
import { API }  from "./services/api.js"

const main = document.querySelector("main")
const searchBar = document.querySelector('#searchbar')
const searchButton = document.querySelector('#search-button')
const checkboxInput = document.querySelector('input[type="checkbox"]')
const pageTitle =  document.querySelector('#header-title')

window.onload = renderPopularMovies()

document.body.addEventListener('keypress', (event) => { searchWithEnter(event) })
pageTitle.addEventListener('click', renderPopularMovies)
searchButton.addEventListener('click', searchWithButton)
checkboxInput.addEventListener('change', checkBoxStatus)

function checkBoxStatus() {
  const isChecked = checkboxInput.checked
  cleanMovies()
  if (isChecked) {
    const favMovies = LocalStorage.getFavorites() || []
    favMovies.forEach(movie => renderMovie(movie))
  } else {
    renderPopularMovies()
  }
}

async function renderPopularMovies() {
  const movies = await API.getPopularMovies()
  
  cleanMovies()
  movies.forEach(movie => renderMovie(movie))
}

async function searchWithButton() {
  const searchBarIsEmpty = searchBar.value == ""

  if(!searchBarIsEmpty) {
    const searchResult = await API.searchMovies(searchBar.value)
    cleanMovies()
    searchResult.forEach(movie => renderMovie(movie)) 
  } else {
    console.log('searchbar is empty')
  }
}

async function searchWithEnter(event) {
  const enterPressed = event.key == 'Enter'
  const searchBarIsOnFocus= searchBar == document.activeElement
  const searchBarIsEmpty = searchBar.value == ""

  if(enterPressed && searchBarIsOnFocus && !searchBarIsEmpty) {
    const searchResult = await API.searchMovies(searchBar.value)
    cleanMovies()
    searchResult.forEach(movie => renderMovie(movie)) 
  }
}

function cleanMovies() {
  main.innerHTML = ""
}

function renderMovie(movie){
  const { id, title, poster_path, vote_average, release_date, overview } = movie

  const isFavorite = LocalStorage.checkIfIsFavorite(id)
  const year = new Date(release_date).getFullYear() //Filter only the year from release_date
  const image = `https://image.tmdb.org/t/p/w500${poster_path}`

  const movieCard = document.createElement('div')
  movieCard.classList.add('movie-card')
  
  const movieInfosContainer = document.createElement('div')
  movieInfosContainer.classList.add('container-row')

  const movieImage = document.createElement('img')
  movieImage.classList.add('movie-image')
  movieImage.src = image
  movieImage.alt = `${title} poster`
  movieInfosContainer.appendChild(movieImage)

  const movieInfos = document.createElement('div')
  movieInfos.classList.add('movie-infos', 'container-column')

  const movieTitle = document.createElement('p')
  movieTitle.classList.add('movie-title')
  movieTitle.textContent = `${title} (${year})`
  movieInfos.appendChild(movieTitle)

  const rattingContainer = document.createElement('div')
  rattingContainer.classList.add('container-row')

  const movieRateContainer = document.createElement('div')
  movieRateContainer.classList.add('container-row')
  
  const starRateImage = document.createElement('img')
  starRateImage.src = 'img/star.svg'
  starRateImage.alt = 'a yellow star'
  movieRateContainer.appendChild(starRateImage)

  const movieRateText = document.createElement('p')
  movieRateText.classList.add('movie-rate')
  movieRateText.textContent = vote_average
  movieRateContainer.appendChild(movieRateText)

  rattingContainer.appendChild(movieRateContainer)

  const favContainer = document.createElement('div')
  favContainer.classList.add('fav-container', 'container-row')

  const favImage = document.createElement('img')
  favImage.classList.add('fav-image')
  favImage.src = isFavorite ? 'img/filled-heart.svg' : 'img/empty-heart.svg'
  favImage.alt = 'Heart'

  favImage.addEventListener('click', (event) => favoriteButton(event, movie))

  favContainer.appendChild(favImage)

  const favText = document.createElement('p')
  favText.classList.add('fav-button-text')
  favText.textContent = isFavorite ? 'Favorito' : 'Favoritar'
  favContainer.appendChild(favText)

  rattingContainer.appendChild(favContainer)

  movieInfos.appendChild(rattingContainer)

  movieInfosContainer.appendChild(movieInfos)

  movieCard.appendChild(movieInfosContainer)

  const movieDescription = document.createElement('p')
  movieDescription.classList.add('description')
  movieDescription.textContent = formatDescription(overview)
  movieCard.appendChild(movieDescription)

  main.appendChild(movieCard)
}

function formatDescription(description) {
  const descriptionLength = description.length

  if (descriptionLength == 0){
    return 'Descrição indisponível'
  }else if (descriptionLength <= 475) {
    return description
  }else {
    return `${description.slice(0, 475)}...`
  }
}

function favoriteButton(event, movie) {
  const favState = {
    favorite: 'img/filled-heart.svg',
    notFavorite: 'img/empty-heart.svg'
  }

  if(event.target.src.includes(favState.notFavorite)){
    event.target.src = favState.favorite
    LocalStorage.setFavorite(movie)
    console.log('ERA FAV')
  } else {
    event.target.src = favState.notFavorite
    LocalStorage.removeFavorite(movie.id)
    console.log('NAO ERA FAV')
  }

  renderPopularMovies()
}
