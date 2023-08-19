import React, { useEffect, useState, useMemo } from "react";

import "react-lazy-load-image-component/src/effects/opacity.css";
import "../App.css";

import { capitalize } from "@mui/material";

import Fade from "@mui/material/Fade";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { LazyLoadImage } from "react-lazy-load-image-component";

import { useParams, Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getPokemonById, selectDataPokemonId } from "./../reducers/pokemon";

//import { selectDataAbility, getAbilityById } from "../reducers/ability";

import TabStats from "../components/TabStats";

import { colorPokemonTypes, fixPokemonName } from "./../helpers";
import { styled, useTheme } from "@mui/material/styles";

import { fixEvolutionChain, wc_hex_is_light } from "../helpers";

import { URL_IMAGE_ITEMS } from "./../helpers/constants";

import ErrorPage from "./ErrorPage";

import PokemonCardBasicDetails from "../components/InfoPokemon/PokemonCardBasicDetails";
import useWidth from "./../hooks/useWidth";
import LazyLoadImageWithTransition from "../components/InfoPokemon/LazyLoadImageWithTransition";

//const UrlBase = URL_IMAGE_ARTWORKS;

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

const InfoPokemon = () => {
  const theme = useTheme();
  let data = useSelector(selectDataPokemonId);
  let loading = useSelector((state) => state.pokemon.loadingId);
  let error = useSelector((state) => state.pokemon.errorPokemonId);

  const dispatch = useDispatch();

  const { id } = useParams();

  const [idImage, setIdImage] = useState(id);
  const [isForm, setIsForm] = useState(false);
  //const [shiny, setShiny] = useState(false);

  //const appBarTitle = useSelector((state) => state.general.title);
  const location = useLocation();

  // useEffect(() => {
  //   const idToUpdate = isForm ? idImage : id;
  //   dispatch(getPokemonById(idToUpdate));
  //   setShiny(false);
  //   setIdImage(idToUpdate);
  // }, [dispatch, id, idImage, isForm]);

  // useEffect(() => {
  //   if (data) {
  //     setIdImage(data.id);
  //   }
  // }, [data]);

  useEffect(() => {
    const idToRender = isForm ? idImage : id;

    dispatch(getPokemonById(idToRender));
    //setShiny(false);
    setIdImage(idToRender);
  }, [dispatch, id, idImage, isForm]);

  useEffect(() => {
    if (data) {
      setIdImage(data.id);
    }
  }, []);

  useEffect(() => {
    setIsForm(false);
  }, [location]);

  const { colorType1, colorType2 } = colorPokemonTypes(data?.types);

  let evolutionChain = useMemo(() => {
    return fixEvolutionChain(data?.evolution_chain);
  }, [data?.evolution_chain]);

  const [prevPokemon, nextPokemon] = useMemo(() => {
    const prevPokemon = data?.id === 1 ? data?.id : data?.id - 1;
    const nextPokemon = data?.id === 1008 ? data?.id : data?.id + 1;

    return [prevPokemon, nextPokemon];
  }, [data?.id]);

  let generaPokemon = useMemo(() => {
    const data_genera = data?.genera?.filter((v) => v.language.name === "en");

    return data_genera?.length > 0 ? data_genera[0]?.genus : "Not Available";
  }, [data]);

  // if (loading) {
  //   return (
  //     <Container
  //       maxWidth="xl"
  //       component="main"
  //       sx={{
  //         position: "relative",
  //         height: "calc(100vh - 50px)",
  //         width: "100%",
  //         margin: 0,
  //         padding: 0,
  //       }}
  //     >
  //       <Grid
  //         container
  //         display="flex"
  //         alignItems="center"
  //         justifyContent="space-around"
  //         position="relative"
  //       >
  //         <Grid item xs={12}>
  //           <Typography
  //             component="h1"
  //             sx={{
  //               WebkitBackgroundClip: "text",
  //               WebkitTextFillColor: "transparent",
  //               fontWeight: "bold",
  //               textAlign: "center",
  //               textTransform: "uppercase",
  //             }}
  //           >
  //             <Skeleton sx={{ height: "12em" }} />
  //           </Typography>
  //         </Grid>
  //       </Grid>
  //       <Grid
  //         container
  //         sx={{
  //           display: "flex",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Grid item xs={12} md={3}>
  //           <Skeleton variant="rectangular" sx={{ height: "500px" }} />
  //         </Grid>
  //         <Grid item xs={12} md={4} display="center" justifyContent="center">
  //           <LazyLoadImage
  //             // src={`${UrlBase}${
  //             //   idImage == 10158 ? "pikachu-partner" : idImage
  //             // }.png`}
  //             src={data?.artwork_url}
  //             alt={`pokemon-${data?.name}`}
  //             effect="blur"
  //             placeholderSrc={`/pokeball.png`}
  //             style={{
  //               width: "100%",
  //               maxWidth: "500px",
  //               filter: `drop-shadow(7px 7px 0px ${colorType1}) drop-shadow(-7px -7px 0px ${colorType2})`,
  //             }}
  //           />
  //         </Grid>
  //         <Grid item xs={12} md={5}>
  //           <Skeleton variant="rectangular" sx={{ height: "500px" }} />
  //         </Grid>
  //         <Grid item xs={12}>
  //           <Typography variant="h5" align="center">
  //             Evolution chain
  //           </Typography>
  //           <Box
  //             sx={{
  //               display: "flex",
  //               justifyContent: "space-evenly",
  //               width: "100%",
  //             }}
  //           >
  //             <Skeleton sx={{ width: "100%" }} />
  //           </Box>
  //         </Grid>
  //       </Grid>
  //     </Container>
  //   );
  // }

  if (error) {
    return (
      <ErrorPage
        title="Oops! Something is wrong"
        message={`The pokemon "${id}" you are looking for might be not exist.`}
      />
    );
  }

  console.clear();
  console.log(evolutionChain);

  return (
    <Container
      maxWidth="xl"
      component="main"
      sx={{
        position: "relative",
        height: "calc(100vh - 50px)",
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
            minHeight: "12em",
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
          <Fade in={!loading} timeout={550}>
            <Typography
              component="h1"
              sx={{
                background: `linear-gradient(to right, ${colorType1}, ${colorType2})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                fontSize: "6vw",
                maxHeight: "10em",
                textAlign: "center",
                textTransform: "uppercase",
                [theme.breakpoints.down("md")]: {
                  fontSize: "10vw",
                  maxHeight: "5em",
                },
              }}
            >
              {fixPokemonName(data?.name)}
            </Typography>
          </Fade>
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
          <StyledLink
            to={`/pokemon/${nextPokemon}`}
            color={colorType2}
            onKeyPress={(e) => {
              console.log(e.key);
            }}
          >
            <ChevronRightIcon />
          </StyledLink>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Fade in={!loading} timeout={550}>
            <Box>
              <PokemonCardBasicDetails
                pokemonId={data?.id}
                pokemon_original_id={data?.pokemon_original_id}
                colors={{ colorType1, colorType2 }}
                height={data?.height}
                weight={data?.weight}
                types={data?.types}
                abilities={data?.abilities}
                varieties={data?.varieties}
                setIdImage={setIdImage}
                setIsForm={setIsForm}
              />
            </Box>
          </Fade>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            order: { xs: "-4", sm: "0" },
          }}
        >
          {/* <LazyLoadImage
            // src={`${UrlBase}${
            //   idImage == 10158 ? "pikachu-partner" : idImage
            // }.png`}
            src={data?.artwork_url}
            alt={`pokemon-${data?.name}`}
            effect="opacity"
            //placeholderSrc={`/pokeball.png`}
            //onLoad={handleImageLoad}
            key={data?.artwork_url}
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "100%",
              filter: `drop-shadow(7px 7px 0px ${colorType1}) drop-shadow(-7px -7px 0px ${colorType2})`,
            }}
          /> */}
          <Fade in={!loading} timeout={550}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <LazyLoadImageWithTransition
                src={data?.artwork_url}
                alt={`pokemon-${data?.name}`}
                key={data?.artwork_url}
                colorType1={colorType1}
                colorType2={colorType2}
              />
              <Typography
                component="h6"
                variant="h6"
                sx={{
                  background: colorType1,
                  color: wc_hex_is_light(colorType1) ? "white" : "black",
                  borderRadius: "8px",
                  padding: "5px 10px",
                  marginBottom: "10px",
                }}
              >
                {generaPokemon}
              </Typography>
            </Box>
          </Fade>
        </Grid>

        <Grid item xs={12} sn={12} md={4}>
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
        <Grid item xs={12} marginTop={5}>
          <Typography variant="h5" align="center">
            Evolution chain
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: { xs: "column", md: "row" },
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
  const theme = useTheme();
  const width = useWidth();

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

    return capitalize(name.replace("-", " "));
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
    held_item,
    relative_physical_stats,
    known_move,
    known_move_type,
    time_of_day,
    location,
    needs_overworld_rain,
    turn_upside_down,
    trade_species,
    party_species,
    ...others
  }) => {
    let fixTrigger = fixTriggerName(trigger_name);
    let minLevelArray = Object.entries({
      min_level,
      min_happiness,
      min_affection,
      min_beauty,
    }).filter(([, v]) => v !== null);

    const textLevel =
      minLevelArray.length === 1
        ? minLevelArray[0][0] === "min_level"
          ? minLevelArray[0][1]
          : `${minLevelArray[0][1]} of ${minLevelArray[0][0].replace(
              "min_",
              ""
            )}`
        : "";

    const fixItem =
      item !== null
        ? ` ${item.replace("-", " ")}`
        : held_item !== null
        ? ` holding ${held_item.replace("-", " ")}`
        : "";

    //Data to show if

    const moreDetails = [
      relative_physical_stats === 0
        ? "Attack = Defense"
        : relative_physical_stats === 1
        ? "Attack > Defense"
        : relative_physical_stats === 2
        ? "Attack < Defense"
        : null,
      known_move && `knowing ${known_move}`,
      known_move_type && `knowing ${known_move_type} move`,
      time_of_day && `at ${time_of_day} time`,
      location && `at ${location}`,
      needs_overworld_rain && "during rain",
      turn_upside_down && "holding the console upside down",
      trade_species && `with ${trade_species}`,
      party_species && `with ${party_species} in party`,
    ]
      .filter(Boolean)
      .join("\n");

    return `${fixTrigger}${fixItem} ${textLevel}${
      moreDetails ? "\n" + moreDetails : ""
    }`;
  };

  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row-reverse" },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          background: "blue",
          display: "flex",
          flexDirection: { xs: "column" },
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
          <Typography
            variant={"body1"}
            component="h5"
            sx={{ color: `${colorType1}` }}
          >
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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row-reverse" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {["sm", "xs"].includes(width) ? (
            <ArrowDownwardIcon />
          ) : (
            <ArrowForwardIcon />
          )}
          <Typography variant={"body1"} component="p">
            {fixEvolutionMethod(pokemonDetail)
              .split("\n")
              .map((value, index) => (
                <span key={index}>
                  {value} <br />
                </span>
              ))}
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
