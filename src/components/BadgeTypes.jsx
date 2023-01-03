import React from "react";

import { Chip, Box } from "@mui/material";

import { styled } from "@mui/material/styles";

import iconTypePokemon from "./../assets/types";
import { COLOR } from "./../helpers/constants";

const StyledChip = styled(Chip)(({ typecolor }) => ({
  backgroundColor: `${typecolor} !important`,
  width: "auto",
  zIndex: 2,
  color: "#fff",
  textTransform: "capitalize",
  borderRadius: "5px",
  ".MuiChip-icon": {
    width: "18px",
    height: "18px",
    path: {
      fill: "#fff",
    },
  },
}));

const BadgeTypes = ({
  types,
  display = "flex",
  justifyContent = "space-around",
}) => {
  return (
    <Box
      sx={{
        display: display,
        justifyContent: justifyContent,
        margin: 0,
        padding: 0,
      }}
    >
      {types?.map((value, key) => (
        <StyledChip
          key={key}
          label={value.type.name}
          icon={iconTypePokemon[value.type?.name]}
          typecolor={COLOR[value.type?.name]}
          size="small"
        />
      ))}
    </Box>
  );
};

export default BadgeTypes;
