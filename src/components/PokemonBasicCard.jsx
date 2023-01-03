import React from "react";
import { Card, CardHeader, CardContent, Box } from "@mui/material";

import { cardMediaClasses } from "@mui/material/CardMedia";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { styled, useTheme } from "@mui/material/styles";

import { Link } from "react-router-dom";

import { colorPokemonTypes, fixPokemonName } from "../helpers";
import BadgeTypes from "./BadgeTypes";
import { Pokeball } from "./../assets/patterns";
import { URL_IMAGE_ARTWORKS } from "../helpers/constants";

const UrlBase = URL_IMAGE_ARTWORKS;

const imgSize = "200px";

const SvgPokeball = styled(Pokeball)(({ theme, ...otherProps }) => {
  const colorType1 = otherProps["data-color-type1"];
  const colorType2 = otherProps["data-color-type2"];

  const strokeColor = theme.palette.text.secondary;

  return {
    width: imgSize,
    height: imgSize,
    transform: "rotate(45deg)",
    transition: "all ease-in-out .3s",

    path: {
      fill: "none",
      stroke: `${strokeColor}`,
    },
  };
});

const StyledCardHeader = styled(CardHeader)(({ theme }) => {
  const colorText = theme.palette.text.primary;

  const textShadow = `0px 0px 5px ${colorText}`;

  return {
    ".MuiCardHeader-content": {
      display: "flex",
      flexDirection: "column-reverse",
    },
    ".MuiCardHeader-subheader": {
      color: colorText,
      textShadow: textShadow,
      letterSpacing: "2px",
      zIndex: 3,
      textAlign: "center",
      transition: "text-shadow ease-in-out .3s",
    },
    ".MuiCardHeader-title": {
      color: colorText,
      textShadow: textShadow,
      letterSpacing: "2px",
      textAlign: "center",
      zIndex: 3,
      transition: "text-shadow ease-in-out .3s",
    },
  };
});

const PokemonBasicCard = ({ id, name, types }) => {
  const { colorType1, colorType2 } = colorPokemonTypes(types);
  const theme = useTheme();

  return (
    <Link to={`/pokemon/${id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          //background: `linear-gradient(to right, ${colorType1}, ${colorType2})`,
          //maxWidth: "400px",
          cursor: "pointer",
          border: "none",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          transition: "all ease-in-out .3s",
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "light"
                ? "rgba(0,0,0,.1)"
                : "rgba(255,255,255,.1)",
            ".card_img_lazy": {
              filter: `drop-shadow(7px 7px 0 ${colorType1}) drop-shadow(-7px -7px 0 ${colorType2})`,
              transform: "scale(1.05)",
            },
            ".card_pokeball": {
              transform: "rotate(0deg) !important",
              filter: `drop-shadow(5px 5px 0 ${colorType1}) drop-shadow(-5px -5px 0 ${colorType2})`,
            },
            ".MuiCardHeader-title, .MuiCardHeader-subheader": {
              textShadow: `1px 1px 1px ${colorType1}, -1px -1px 1px ${colorType2}`,
            },
          },
          "@keyframes fadeIn ": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            transition: "all ease-in-out .3s",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SvgPokeball
              className="card_pokeball"
              data-color-type1={colorType1}
              data-color-type2={colorType2}
            />
            <LazyLoadImage
              className="card_img_lazy"
              wrapperClassName="card_span_lazy"
              placeholderSrc="./pokeball.png"
              //placeholder="./pokaball.png"
              src={`${UrlBase}${id}.png`}
              effect="blur"
              alt={name}
              style={{
                position: "absolute",
                width: imgSize,
                zIndex: 1,
                transition: "all ease-in-out .3s",
              }}
            />
          </Box>
          <Box>
            <StyledCardHeader
              title={fixPokemonName(name)}
              subheader={`${id}`}
              sx={{
                textTransform: "capitalize",
                display: "flex",
                justifyContent: "space-between",
              }}
            />
            <BadgeTypes types={types} />
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PokemonBasicCard;
