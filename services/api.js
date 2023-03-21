import apiKey from "./apiKey.js"

async function getPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`
  const fetchResponse = await fetch(url) 
  const { results } = await fetchResponse.json() //Convert the response to a JSON

  console.log(results)
  return results
}

async function searchMovies(searchText) {
  try{
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${searchText}&page=1&include_adult=false`
    const fetchResponse = await fetch(url) 
    const { results } = await fetchResponse.json() //Convert the response to a JSON
    
    return(results)

  } catch{(e) => console.log(e)}
}

export const API = {
  getPopularMovies,
  searchMovies
}