import React from "react";

import { useDispatch, useSelector } from "react-redux";

import Header from "./Header";

import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const index = ({ title = "PokeDéx", children }) => {
  return (
    <Box sx={{ display: "flex", position: "relative", height: "100vh" }}>
      <CssBaseline />
      <Header title={title} />
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
          height: "calc(100% - 40px)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default index;
