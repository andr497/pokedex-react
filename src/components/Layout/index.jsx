import React from "react";

import { useDispatch, useSelector } from "react-redux";

import Header from "./Header";

import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import { setTitle } from "../../reducers/general";

const index = (props) => {
  const appBarTitle = useSelector((state) => state.general.title);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setTitle("PokeDéx"));
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <CssBaseline />
      <Header title={appBarTitle} />
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
