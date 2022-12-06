import { apiKey } from "./api.js" 
const main = document.querySelector("main")
const searchBar = document.querySelector('#searchbar')
const searchButton = document.querySelector('#search-button')
const pageTitle =  document.querySelector('#header-title')

pageTitle.addEventListener('click', () => renderPopularMovies())

window.onload = renderPopularMovies()

document.body.addEventListener('keypress', (event) => { //Event to make possible add tasks with Enter Key
  searchWithEnter(event)
})

searchButton.addEventListener('click', () => searchWithButton())

async function renderPopularMovies() {
  cleanMovies()

  const movies = await getPopularMovies()
  movies.forEach(movie => renderMovie(movie))
}

async function getPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`
  const fetchResponse = await fetch(url) 
  const { results } = await fetchResponse.json() //Convert the JSON response to a JS object

  return results
}

async function searchMovies(searchText) {
  const url = `https://api.themoviedb.org/3/search/movie/?api_key=${apiKey}&language=pt-BR&query=${searchText}&page=1&include_adult=false`
  const fetchResponse = await fetch(url) 
  const { results } = await fetchResponse.json() //Convert the JSON response to a JS object

  const movies = results

  cleanMovies()
  movies.forEach(movie => renderMovie(movie))
}

function renderMovie(movie){
  const { title, poster_path, vote_average, release_date, overview } = movie

  const isFavorited = Math.floor(Math.random()*2) //Get random number between 1 and 0
  const year = new Date(release_date).getFullYear() //Filter only the year from release_date
  const image = `https://image.tmdb.org/t/p/w500${poster_path}`

  const movieCard = document.createElement('div')
  movieCard.classList.add('movie-card')

  movieCard.innerHTML = `
      <div class="container-row">
        <img src="${image}" alt="" class="movie-image">
        <div class="movie-infos container-column">
          <p class="movie-title">
            ${title} (${year})
          </p>
          <div class="container-row">
            <div class="container-row">
              <img src="img/star.svg" alt="a yellow star">
              <p class="movie-rate">${vote_average}</p>
            </div>
            <div class="fav-container container-row">
              <button type="button" class="button" id="fav-button">
                <img src="${isFavorited ? 'img/filled-heart.svg' : 'img/empty-heart.svg'}" class="fav-image" alt="a empty red heart">
              </button>
              <p class="fav-button-text">${isFavorited ? 'Favorito' : 'Favoritar'}</p>
            </div>
          </div>
        </div>
      </div>
      <p class="description">
        ${formatDescription(overview)} 
      </p>
  `

  main.appendChild(movieCard)

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
}

function cleanMovies() {
  main.innerHTML = ""
}

function searchWithButton() {
  const searchBarIsEmpty = searchBar.value == ""

  searchBarIsEmpty ? console.log('empty searchbar') : searchMovies(searchBar.value)
}

function searchWithEnter(event) {
  const enterPressed = event.key == 'Enter'
  const searchBarIsOnFocus= searchBar == document.activeElement
  const searchBarIsEmpty = searchBar.value == ""

  if(enterPressed && searchBarIsOnFocus && !searchBarIsEmpty) {
    searchMovies(searchBar.value)
  }
}