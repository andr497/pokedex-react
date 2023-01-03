import { configureStore } from "@reduxjs/toolkit";

import pokemonReducer from "./pokemon";
import abilityReducer from "./ability";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    ability: abilityReducer,
  },
});

export default store;
