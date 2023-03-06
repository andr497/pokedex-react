import React, { useState } from "react";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SearchPokemon from "./../components/SearchPokemon";

const Searcher = () => {
  return (
    <Container
      sx={{
        display: "grid",
        placeItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <SearchPokemon />
      </Box>
    </Container>
  );
};

export default Searcher;
