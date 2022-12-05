const main = document.querySelector("main")

const movies = [
  {
    image: 'https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg',
    title: 'Batman',
    rating: 9.2,
    year: 2022,
    description: "Descrição do filme…",
    isFavorited: true,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg',
    title: 'Avengers',
    rating: 9.2,
    year: 2019,
    description: "Descrição do filme…",
    isFavorited: false
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg',
    title: 'Doctor Strange',
    rating: 9.2,
    year: 2022,
    description: "Descrição do filme…",
    isFavorited: false
  },
]

function renderMovie(movie){
  const movieCard = document.createElement('div')

  movieCard.classList.add('movie-card')

  movieCard.innerHTML = `
      <div class="container-row">
        <img src="${movie.image}" alt="" class="movie-image">
        <div class="movie-infos container-column">
          <p class="movie-title">
            ${movie.title} (${movie.year})
          </p>
          <div class="container-row">
            <div class="container-row">
              <img src="img/star.svg" alt="a yellow star">
              <p class="movie-rate">${movie.rating}</p>
            </div>
            <div class="fav-container container-row">
              <button type="button" class="button" id="fav-button">
                <img src="${movie.isFavorited ? 'img/filled-heart.svg' : 'img/empty-heart.svg'}" class="fav-image" alt="a empty red heart">
              </button>
              <p class="fav-button-text">${movie.isFavorited ? 'Favorito' : 'Favoritar'}</p>
            </div>
          </div>
        </div>
      </div>
      <p class="description">
        ${movie.description}  
      </p>
  `

  main.appendChild(movieCard)
}

window.onload = () => {movies.forEach(movie => renderMovie(movie))}