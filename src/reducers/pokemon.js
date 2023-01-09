import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllPokemon,
  fetchPokemonById,
  fetchPokemonSpeciesById,
} from "../api/pokemon";
import { LIMIT_PAGE } from "../helpers/constants";

const initialState = {
  loading: false,
  data: null,
  loadingId: false,
  dataPokemonId: null,
  errorPokemonId: null,
};

export const getAllPokemon = createAsyncThunk(
  "pokemon/getAll",
  async (page) => {
    const limit = LIMIT_PAGE;
    const offset = page === 1 ? 0 : limit * page - limit;

    const allPokemonResponse = await fetchAllPokemon(limit, offset);
    let { data } = allPokemonResponse;

    data.results = await Promise.all(
      data.results.map(async (v) => {
        //console.log(test.results[k]);
        let pokemonId = v.url.split("/")[6];
        let pokemon = await fetchPokemonById(pokemonId).then((res) => {
          return res.data;
        });

        return pokemon;
      })
    );

    return data;
  }
);

export const getPokemonById = createAsyncThunk(
  "pokemon/getPokemonId",
  async (id) => {
    let pokemonSpecieId = id;
    const pokemonResponse = await fetchPokemonById(id).then(
      async (response) => {
        pokemonSpecieId = response.data.species.url.split("/")[6];

        const speciesResponse = await fetchPokemonSpeciesById(
          pokemonSpecieId
        ).then(async (response) => {
          const evolutionUrl = response.data.evolution_chain?.url ?? null;

          if (evolutionUrl === null) {
            return {
              varieties: [],
            };
          }

          const evolutionData = await fetch(evolutionUrl, {
            method: "GET",
          }).then(async (res) => {
            return await res.json();
          });

          return {
            ...response.data,
            evolution_chain: evolutionData,
          };
        });

        return {
          ...response.data,
          ...speciesResponse,
        };
      }
    );

    return {
      ...pokemonResponse,
      pokemon_original_id: pokemonSpecieId,
    };
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPokemonById.pending, (state) => {
        state.dataPokemonId = [];
        state.loadingId = true;
      })
      .addCase(getPokemonById.rejected, (state, action) => {
        state.loadingId = false;
        state.errorPokemonId = action.error;
      })
      .addCase(getPokemonById.fulfilled, (state, action) => {
        state.dataPokemonId = action.payload;
        state.errorPokemonId = false;
        state.loadingId = false;
      });
  },
});

export const selectDataPokemon = (state) => state.pokemon.data;

export const selectDataPokemonId = (state) => state.pokemon.dataPokemonId;

export default pokemonSlice.reducer;
