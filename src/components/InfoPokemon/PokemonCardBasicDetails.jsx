import React, { useState } from "react";

import {
  convertDecimeterToMeter,
  convertHectogramToKilogram,
  fixAbilitiesName,
  fixPokemonName,
} from "../../helpers";

import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import BadgeTypes from "../BadgeTypes";

import Modal from "../Modal";
import useModal from "../../hooks/useModal";

import { fetchAbilityById } from "./../../api/abilities";

const StyleChip = styled(Chip)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
  textTransform: "capitalize",
  ".MuiChip-icon": {
    width: "18px",
    height: "18px",
    path: {
      fill: theme.palette.text.secondary,
    },
  },
}));

const PokemonCardBasicDetails = ({
  pokemonId,
  colors,
  height,
  weight,
  types,
  abilities,
  varieties,
  setIsForm,
  setIdImage,
}) => {
  const theme = useTheme();

  const { isShowing, toggle } = useModal();

  const [messageModal, setMessageModal] = useState({
    title: "",
    content: "",
    transformTitleCss: "none",
  });

  const { colorType1, colorType2 } = colors;
  const countChips = abilities.length > 3 ? 4 : 6;

  return (
    <Box>
      {/* <Button
                onClick={() => {
                  setShiny((prev) => !prev);
                }}
              >
                {!shiny ? "Shiny Mode" : "Normal Mode"}
              </Button> */}
      <Card
        sx={{
          background: `linear-gradient(135deg, ${colorType1} 0%, 
            ${theme.palette.background.default} 25%,
            ${theme.palette.background.default} 75%,
            ${colorType2} 100%)`,
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5" align="center">
            ID: {pokemonId}
          </Typography>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography variant="body1" component="p">
              Height: {convertDecimeterToMeter(height)}M
            </Typography>
            <Typography variant="body1" component="p">
              Weight: {convertHectogramToKilogram(weight)}Kg
            </Typography>
          </Box>
        </CardContent>
        <Divider>TYPES</Divider>
        <CardActions>
          <BadgeTypes
            types={types}
            size="medium"
            display="flex"
            justifyContent={types.length > 1 ? "space-between" : "center"}
            styles={{
              width: "100%",
            }}
          />
        </CardActions>
        <Divider>Abilities</Divider>
        <CardActions>
          <Grid
            width="100%"
            marginBottom={4}
            maxHeight="300px"
            container
            spacing={1}
          >
            {abilities.map((value, key) => {
              const fixedAbilityName = fixAbilitiesName(value.ability.name);

              return (
                <Grid item key={key} xs={countChips}>
                  <Tooltip key={key} title={value.is_hidden ? "Hidden" : ""}>
                    <StyleChip
                      label={fixedAbilityName}
                      icon={value.is_hidden ? <AutoAwesomeIcon /> : null}
                      onClick={() => {
                        fetchAbilityById(value.ability.name).then((res) => {
                          const description = res.data.effect_entries.filter(
                            (v) => v.language.name === "en"
                          );

                          let data = {
                            title: `Ability - ${fixedAbilityName}`,
                            transformTitleCss: "capitalize",
                            content: "There is no info yet about this ability.",
                          };

                          if (description.length > 0) {
                            data.content = () => (
                              <>
                                <Typography
                                  align="center"
                                  variant="h6"
                                  component="h6"
                                  sx={{
                                    color: colorType1,
                                  }}
                                >
                                  Effect
                                </Typography>

                                <Typography
                                  align="justify"
                                  variant="body1"
                                  component="p"
                                >
                                  {description[0].effect}
                                </Typography>

                                <Typography
                                  align="center"
                                  variant="h6"
                                  component="h6"
                                  sx={{
                                    color: colorType1,
                                  }}
                                >
                                  Short effect
                                </Typography>
                                <Typography
                                  align="justify"
                                  variant="body1"
                                  component="p"
                                >
                                  {description[0].short_effect}
                                </Typography>
                              </>
                            );
                          }

                          setMessageModal(data);
                          toggle();
                        });
                      }}
                    />
                  </Tooltip>
                </Grid>
              );
            })}
          </Grid>
        </CardActions>
        <Divider>Forms</Divider>
        <CardActions>
          <Grid
            width="100%"
            marginBottom={4}
            maxHeight="300px"
            container
            spacing={1}
          >
            {varieties.map((value, key) => (
              <Grid item key={key} xs={countChips}>
                <Tooltip
                  title={fixPokemonName(value.pokemon.name)}
                  placement="top"
                >
                  <StyleChip
                    label={fixPokemonName(value.pokemon.name)}
                    onClick={() => {
                      const idImageSelected = value.pokemon.url.split("/")[6];

                      if (pokemonId !== idImageSelected) {
                        setIsForm(true);
                      } else {
                        setIsForm(false);
                      }
                      setIdImage(idImageSelected);
                    }}
                  />
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </CardActions>
      </Card>

      <Modal
        isShowing={isShowing}
        hide={toggle}
        title={messageModal.title}
        transformTitleCss={messageModal.transformTitleCss}
        content={messageModal.content}
      />
    </Box>
  );
};

export default PokemonCardBasicDetails;
