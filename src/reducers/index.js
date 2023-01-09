import { configureStore } from "@reduxjs/toolkit";

import pokemonReducer from "./pokemon";
import abilityReducer from "./ability";
import generalReducer from "./general";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    ability: abilityReducer,
    general: generalReducer,
  },
});

export default store;
