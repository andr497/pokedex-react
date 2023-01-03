import axios from "axios";

const API = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export function fetchAbilityById(abilityId) {
  return API.get(`/ability/${abilityId}`);
}
