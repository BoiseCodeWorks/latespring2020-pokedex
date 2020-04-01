import store from "../store.js";
import Pokemon from "../Models/Pokemon.js";
import CaughtPokemon from "../Models/CaughtPokemon.js";


let _pokemonApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10000
})

let _sandboxApi = axios.create({
  baseURL: '//bcw-sandbox.herokuapp.com/api/darryl/pokemon',
  timeout: 10000
})

class PokemonService {
  catchActivePokemon() {
    _sandboxApi.post('', store.State.activePokemon)
      .then(res => {
        console.log("caught pokemon", res.data)
        this.getMyPokemon()
      })
      .catch(err => console.error(err))
  }

  getMyPokemon() {
    _sandboxApi.get()
      .then(res => {
        console.log("My pokemon", res.data.data)
        let myPokemon = res.data.data.map(pokemonRawData => new CaughtPokemon(pokemonRawData))
        store.commit("myPokemon", myPokemon)
      })
  }


  getDetails(pokemonName) {
    _pokemonApi.get('pokemon/' + pokemonName)
      .then(res => {
        console.log("getDetails", res.data)
        let pokemon = new Pokemon(res.data)
        store.commit("activePokemon", pokemon)
      })
      .catch(err => console.error(err))
  }

  constructor() {
    this.getWildPokemon()
    this.getMyPokemon()
  }

  getWildPokemon() {
    _pokemonApi.get('pokemon?limit=964')
      .then(res => {
        console.log("wild pokemon", res.data.results)
        store.commit('wildPokemon', res.data.results)
      })
  }




}


const service = new PokemonService();
export default service;
