import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";
import SearchPokemon from "../SearchPokemon";
import SwitchTheme from "./SwitchTheme";
import SwipeableTemporaryDrawer from "./Menu/SwipeableTemporaryDrawer";

export default function Header({ title = "App name" }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen((prev) => !prev);
  };

  return (
    <AppBar component="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={(e) => {
              toggleDrawer(e);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src="/pokeball.png"
            width={30}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>
          <SearchPokemon />
          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
            <SwitchTheme />
          </Box>
        </Toolbar>
        <SwipeableTemporaryDrawer open={open} toggleDrawer={toggleDrawer} />
      </Container>
    </AppBar>
  );
}
