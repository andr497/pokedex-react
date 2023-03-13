import React, { useState, useEffect } from "react";

import {
  convertDecimeterToMeter,
  convertHectogramToKilogram,
  fixAbilitiesName,
  fixVarietiesName,
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
import Skeleton from "@mui/material/Skeleton";

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
  pokemonId = null,
  pokemon_original_id = null,
  colors = null,
  height = null,
  weight = null,
  types = null,
  abilities = null,
  varieties = null,
  setIsForm = null,
  setIdImage = null,
}) => {
  const theme = useTheme();

  const { isShowing, toggle } = useModal();

  const [messageModal, setMessageModal] = useState({
    title: "",
    content: "",
    transformTitleCss: "none",
  });

  const { colorType1, colorType2 } = colors;
  const countChips = abilities?.length > 3 ? 4 : 6;
  const [state, setState] = useState(null);

  useEffect(() => {
    if (!pokemonId) {
      setState(pokemonId);
    }
  }, [pokemonId]);

  return (
    <Box sx={{ minWidth: "250px", maxWidth: "400px" }}>
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
          transition: "background ease-in-out .55s",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5" align="center">
            ID: {pokemonId ?? "-"}
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
            justifyContent={types?.length > 1 ? "space-between" : "center"}
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
            {abilities ? (
              abilities?.map((value, key) => {
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
                              content:
                                "There is no info yet about this ability.",
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
              })
            ) : (
              <>
                <Grid item xs={6}>
                  <Skeleton sx={{ width: "100%", height: "42px" }} />
                </Grid>
                <Grid item xs={6}>
                  <Skeleton sx={{ width: "100%", height: "42px" }} />
                </Grid>
              </>
            )}
          </Grid>
        </CardActions>
        <Divider>Forms</Divider>
        <CardActions>
          <Grid
            width="100%"
            marginBottom={4}
            maxHeight={pokemonId === 25 ? "340px" : "300px"}
            container
            spacing={1}
          >
            {varieties?.map((value, key) => {
              const idImageSelected = value.pokemon.url.split("/")[6];
              return (
                <Grid item key={key} xs={countChips}>
                  <Tooltip
                    title={fixVarietiesName(
                      value.pokemon.name,
                      value.is_default
                    )}
                    placement="top"
                  >
                    <StyleChip
                      label={fixVarietiesName(
                        value.pokemon.name,
                        value.is_default
                      )}
                      onClick={() => {
                        if (pokemonId !== idImageSelected) {
                          setIsForm(true);
                        } else {
                          setIsForm(false);
                        }
                        setIdImage(idImageSelected);
                        setState(idImageSelected);
                      }}
                    />
                  </Tooltip>
                </Grid>
              );
            })}
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
