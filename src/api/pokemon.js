import axios from "axios";

const API = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export function fetchAllPokemon(limit = 10, offset = 0) {
  return API.get("/pokemon-species", {
    params: {
      limit,
      offset,
    },
  });
}

export function fetchPokemonById(pokemonId) {
  return API.get(`/pokemon/${pokemonId}`);
}

export function fetchPokemonSpeciesById(pokemonId) {
  return API.get(`/pokemon-species/${pokemonId}`);
}
