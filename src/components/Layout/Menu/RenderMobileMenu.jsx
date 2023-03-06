import React, { useState } from "react";

import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import MoreIcon from "@mui/icons-material/MoreVert";
import HomeIcon from "@mui/icons-material/Home";
import SwitchTheme from "./../SwitchTheme";

const RenderMobileMenu = ({ mobileMenuId }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <SwitchTheme />
        </MenuItem>
        <Divider />
        <MenuItem LinkComponent={Link} to="/">
          <HomeIcon />
          <p>Home</p>
        </MenuItem>
      </Menu>
    </>
  );
};

export default RenderMobileMenu;
