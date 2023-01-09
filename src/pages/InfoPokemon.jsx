import React, { useEffect, useState, useMemo } from "react";

import Fade from "@mui/material/Fade";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../App.css";

import { useParams, Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getPokemonById, selectDataPokemonId } from "./../reducers/pokemon";
import { setTitle } from "../reducers/general";

//import { selectDataAbility, getAbilityById } from "../reducers/ability";

import { fetchAbilityById } from "./../api/abilities";

import TabStats from "../components/TabStats";
import BadgeTypes from "../components/BadgeTypes";

import {
  colorPokemonTypes,
  convertDecimeterToMeter,
  convertHectogramToKilogram,
  fixPokemonName,
  fixAbilitiesName,
} from "./../helpers";
import { styled, useTheme } from "@mui/material/styles";

import Modal from "../components/Modal";
import useModal from "../hooks/useModal";

import { fixEvolutionChain } from "../helpers";

import { URL_IMAGE_ITEMS, URL_IMAGE_ARTWORKS } from "./../helpers/constants";
import TableStats from "../components/TableStats";

const UrlBase = URL_IMAGE_ARTWORKS;

const StyledLink = styled(Link)((props) => ({
  display: "flex",
  alignItems: "center",
  color: props.color,
  fontSize: "max(12vw)",
  transition: "all ease-in-out .3s",
  "&:hover": {
    textShadow: "2px 2px 0px black",
  },
  ".MuiSvgIcon-root": {
    fontSize: "max(10vw)",
  },
}));

const StyleChip = styled(Chip)(({ theme }) => ({
  borderRadius: "0px",
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

const InfoPokemon = () => {
  const theme = useTheme();
  const data = useSelector(selectDataPokemonId);
  const loading = useSelector((state) => state.pokemon.loadingId);
  const error = useSelector((state) => state.pokemon.errorPokemonId);

  const [messageModal, setMessageModal] = useState({
    title: "",
    content: "",
    transformTitleCss: "none",
  });

  const dispatch = useDispatch();

  const { id } = useParams();

  const [idImage, setIdImage] = useState(id);
  const [isForm, setIsForm] = useState(false);
  const [shiny, setShiny] = useState(false);

  const { isShowing, toggle } = useModal();

  //const appBarTitle = useSelector((state) => state.general.title);

  useEffect(() => {
    if (isForm) {
      setIdImage(idImage);
    } else {
      setIdImage(id);
    }

    dispatch(getPokemonById(idImage));
    dispatch(setTitle(`PokeDex | Information`));
    setShiny(false);

    //console.log(id, data?.pokemon_original_id, idImage);
  }, [dispatch, idImage, id, isForm]);

  const location = useLocation();
  useEffect(() => {
    console.log("url changed");
    setIsForm(false);
  }, [location]);

  const { colorType1, colorType2 } = colorPokemonTypes(data?.types);

  let evolutionChain = useMemo(() => {
    console.log("memo activado");
    return fixEvolutionChain(data?.evolution_chain);
  }, [data?.evolution_chain]);

  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error) {
    throw new Error("Algo malo paso carnal :c");
    return (
      <Container
        sx={{
          display: "grid",
          placeItems: "center",
          margin: "auto",
        }}
      >
        <img
          src="https://www.pngplay.com/wp-content/uploads/12/Pikachu-Meme-Transparent-Image.png"
          style={{
            width: "420px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontSize: "4rem", color: theme.palette.text.primary }}
          >
            Oops! Something is wrong
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              fontSize: "20px",
              margin: "30px 0px",
              width: "100%",
              minWidth: "350px",
              color: theme.palette.text.secondary,
            }}
          >
            The pokemon you are looking for might be not exist.
          </Typography>
          <Link to="/">Go to Home</Link>
        </Box>
      </Container>
    );
  }

  let prevPokemon = data?.id === 1 ? data?.id : data?.id - 1;
  let nextPokemon = data?.id === 905 ? data?.id : data?.id + 1;

  return (
    <Container
      maxWidth="xl"
      component="main"
      sx={{
        position: "relative",
        //background: `linear-gradient(to right, ${colorType1}, ${colorType2})`,
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        position="relative"
      >
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StyledLink
            to={`/pokemon/${prevPokemon}`}
            color={colorType1}
            onKeyPress={(e) => {
              console.log(e.key);
            }}
          >
            <ChevronLeftIcon />
          </StyledLink>
        </Grid>
        <Grid item xs={8}>
          <Typography
            component="h1"
            sx={{
              background: `linear-gradient(to right, ${colorType1}, ${colorType2})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              fontSize: data?.name.length === 10 ? "7vw" : "8vw",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {fixPokemonName(data?.name)}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StyledLink to={`/pokemon/${nextPokemon}`} color={colorType2}>
            <ChevronRightIcon />
          </StyledLink>
        </Grid>
      </Grid>
      <Grid container sx={{ display: "flex", alignItems: "center" }}>
        <Grid item xs={12} md={3}>
          <Box>
            {/* <Button
                onClick={() => {
                  setShiny((prev) => !prev);
                }}
              >
                {!shiny ? "Shiny Mode" : "Normal Mode"}
              </Button> */}
            <Typography variant="h5">ID: {data?.id}</Typography>
            <Typography variant="h5">
              Height: {convertDecimeterToMeter(data?.height)}M
            </Typography>
            <Typography variant="h5">
              Weight: {convertHectogramToKilogram(data?.weight)}Kg
            </Typography>
            <Typography variant="h5">
              Type:{" "}
              <BadgeTypes
                types={data?.types}
                display="inline"
                justifyContent="center"
              />
            </Typography>
            <Typography variant="h6">
              Abilities:
              {data?.abilities.map((value, key) => {
                const fixedAbilityName = fixAbilitiesName(value.ability.name);
                return (
                  <Tooltip key={key} title={value.is_hidden ? "Hidden" : ""}>
                    <StyleChip
                      label={fixedAbilityName}
                      icon={value.is_hidden ? <AutoAwesomeIcon /> : null}
                      onClick={() => {
                        fetchAbilityById(value.ability.name).then((res) => {
                          const description = res.data.effect_entries.filter(
                            (v) => v.language.name === "en"
                          );

                          const data = {
                            title: `Ability - ${fixedAbilityName}`,
                            transformTitleCss: "capitalize",
                            content: () => (
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
                            ),
                          };

                          setMessageModal(data);
                          toggle();
                        });
                      }}
                    />
                  </Tooltip>
                );
              })}
            </Typography>
            <Modal
              isShowing={isShowing}
              hide={toggle}
              title={messageModal.title}
              transformTitleCss={messageModal.transformTitleCss}
              content={messageModal.content}
            />
            <Typography variant="h6">
              Forms:
              {data?.varieties.map((value, key) => (
                <Tooltip key={key} title={value.is_hidden ? "Hidden" : ""}>
                  <StyleChip
                    label={fixPokemonName(value.pokemon.name)}
                    onClick={() => {
                      const idImageSelected = value.pokemon.url.split("/")[6];

                      if (id !== idImageSelected) {
                        setIsForm(true);
                      } else {
                        setIsForm(false);
                      }
                      setIdImage(idImageSelected);
                    }}
                  />
                </Tooltip>
              ))}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} display="center" justifyContent="center">
          <LazyLoadImage
            src={`${UrlBase}${
              idImage == 10158 ? "pikachu-partner" : idImage
            }.png`}
            alt={`pokemon-${data?.name}`}
            effect="blur"
            placeholderSrc={`/pokeball.png`}
            style={{
              width: "100%",
              maxWidth: "500px",
              filter: `drop-shadow(7px 7px 0px ${colorType1}) drop-shadow(-7px -7px 0px ${colorType2})`,
            }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TabStats
            pokemonId={data?.id}
            stats={data?.stats}
            colorType={[colorType1, colorType2]}
          />
          {/* <TableStats
            pokemonId={data?.id}
            stats={data?.stats}
            colorType={[colorType1, colorType2]}
          /> */}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Evolution chain
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            {evolutionChain?.map((pokemonChain, k) => (
              <Box key={`${k}-evochain`}>
                {pokemonChain.map((pokemonDetail, key) => (
                  <Box
                    key={`${key}-evoline`}
                    component={Link}
                    to={`/pokemon/${pokemonDetail.id}`}
                    onClick={() => {
                      setIsForm(false);
                    }}
                    sx={{
                      textDecoration: "none",
                      color: theme.palette.text.primary,
                    }}
                  >
                    <EvolutionDetails
                      pokemonDetail={pokemonDetail}
                      firstPokemon={k === 0}
                    />
                    {evolutionChain.length === 1 ? (
                      <span>{"This pokemon doesn't evolve"}</span>
                    ) : null}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const EvolutionDetails = ({ pokemonDetail, firstPokemon }) => {
  const [colorType, setColorType] = useState([{ type: "" }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const url = pokemonDetail.url.replace("pokemon-species", "pokemon");
      setLoading(true);
      await fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          setColorType(res.types);
        })
        .finally(() => {
          setLoading(false);
        });
    })();
  }, [pokemonDetail.url]);

  const { colorType1, colorType2 } = colorPokemonTypes(colorType);

  if (loading) {
    return <CircularProgress />;
  }

  const fixTriggerName = (name) => {
    if (!name) return "";

    return name.replace("-", " ");
  };

  const fixGenderText = (gender) => {
    if (!gender) return null;

    let fullName = gender === 1 ? "♀️" : "‍♂️";

    return "Only " + fullName;
  };

  const fixEvolutionMethod = ({
    min_level,
    min_happiness,
    min_affection,
    min_beauty,
    trigger_name,
    item,
    relative_physical_stats,
    ...other
  }) => {
    let fixTrigger = fixTriggerName(trigger_name);
    let minLevelArray = Object.entries({
      min_level,
      min_happiness,
      min_affection,
      min_beauty,
    }).filter((v) => v[1] !== null);

    let textLevel = "";
    if (minLevelArray.length > 1) {
      throw new Error("Revisar que el length es mayor");
    }

    if (minLevelArray.length !== 0 && minLevelArray.length < 2) {
      const [nameLevel, valueLevel] = minLevelArray[0];

      textLevel =
        nameLevel === "min_level"
          ? valueLevel
          : valueLevel + " of " + nameLevel.replace("min_", "");
    }

    if (item !== null) {
      return fixTrigger + " " + item.replace("-", " ");
    }

    //Data to show if
    let physicalStats = "";
    if (relative_physical_stats !== null) {
      let rps = relative_physical_stats;
      physicalStats =
        rps === 0
          ? "Attack = Defense"
          : rps === 1
          ? "Attack > Defense"
          : "Attack < Defense";
    }
    return fixTrigger + " " + textLevel + "\n" + physicalStats;
  };

  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LazyLoadImage
          width={"150px"}
          height={"150px"}
          src={`${pokemonDetail.image}`}
          effect="blur"
          delayTime={1000}
          visibleByDefault={true}
          alt=""
          style={{
            filter: `drop-shadow(7px 7px 0px ${colorType1}) drop-shadow(-7px -7px 0px ${colorType2})`,
          }}
        />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant={"body1"} component="h5">
            {pokemonDetail.id}
          </Typography>
          <Typography
            variant={"body1"}
            component="h5"
            textTransform="capitalize"
          >
            {fixPokemonName(pokemonDetail.species_name)}
          </Typography>
        </Box>
      </Box>
      {!firstPokemon ? (
        <Box>
          <ArrowForwardIcon />
          <Typography variant={"body1"} component="h5">
            {fixEvolutionMethod(pokemonDetail)}
          </Typography>
          {pokemonDetail.held_item !== null ? (
            <img src={`${URL_IMAGE_ITEMS}${pokemonDetail.held_item}.png`} />
          ) : null}
          {pokemonDetail.item !== null ? (
            <img src={`${URL_IMAGE_ITEMS}${pokemonDetail.item}.png`} />
          ) : null}
          <Typography variant={"subtitle2"} component="span">
            {fixGenderText(pokemonDetail.gender)}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default InfoPokemon;
