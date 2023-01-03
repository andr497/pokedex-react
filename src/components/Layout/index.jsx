import React from "react";

import Header from "./Header";

import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

const index = (props) => {
  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <CssBaseline />
      <Header />
      <Box
        component="main"
        sx={{
          p: 4,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 40,
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

export default index;
