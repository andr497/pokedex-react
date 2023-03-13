import React from "react";

import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import SwitchTheme from "../SwitchTheme";

const menu_options = [
  {
    name: "All Pokemon",
    url: "/",
  },
  // {
  //   name: "By Generations",
  //   url: "/generation",
  // },
];

const SwipeableTemporaryDrawer = ({ open, toggleDrawer }) => {
  const theme = useTheme();
  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={(e) => {
        toggleDrawer(e, false);
      }}
      onOpen={(e) => {
        toggleDrawer(e, true);
      }}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={(e) => {
          toggleDrawer(e, false);
        }}
        onKeyDown={(e) => {
          toggleDrawer(e, false);
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "1em 0px",
          }}
        >
          <Box
            component="img"
            src="/pokeball.png"
            width={30}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PokeDex
          </Typography>
        </Box>
        <Divider>Pokemon Lists</Divider>
        <List>
          {[...menu_options].map((value, key) => (
            <ListItem
              key={key}
              disablePadding
              component={Link}
              to={value.url}
              sx={{ color: theme.palette.text.primary }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {key % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={value.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider>Other options</Divider>
        <SwitchTheme />
      </Box>
    </SwipeableDrawer>
  );
};

export default SwipeableTemporaryDrawer;
