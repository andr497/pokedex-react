import React, { useEffect, useState, useMemo } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../App.css";

import { useParams, Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getPokemonById, selectDataPokemonId } from "./../reducers/pokemon";

//import { selectDataAbility, getAbilityById } from "../reducers/ability";

import TabStats from "../components/TabStats";

import { colorPokemonTypes, fixPokemonName } from "./../helpers";
import { styled, useTheme } from "@mui/material/styles";

import { fixEvolutionChain } from "../helpers";

import { URL_IMAGE_ITEMS, URL_IMAGE_ARTWORKS } from "./../helpers/constants";
import TableStats from "../components/TableStats";

import ErrorPage from "./ErrorPage";

import PokemonCardBasicDetails from "../components/InfoPokemon/PokemonCardBasicDetails";

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

const InfoPokemon = () => {
  const theme = useTheme();
  let data = useSelector(selectDataPokemonId);
  let loading = useSelector((state) => state.pokemon.loadingId);
  let error = useSelector((state) => state.pokemon.errorPokemonId);

  const dispatch = useDispatch();

  const { id } = useParams();

  const [idImage, setIdImage] = useState(id);
  const [isForm, setIsForm] = useState(false);
  const [shiny, setShiny] = useState(false);

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
    setShiny(false);
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
    return (
      <ErrorPage
        title="Oops! Something is wrong"
        message={`The pokemon "${id}" you are looking for might be not exist.`}
      />
    );
  }

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
        <Grid item xs={12} md={3}>
          {data ? (
            <PokemonCardBasicDetails
              pokemonId={data?.id}
              colors={{ colorType1, colorType2 }}
              height={data?.height}
              weight={data?.weight}
              types={data?.types}
              abilities={data?.abilities}
              varieties={data?.varieties}
              setIdImage={setIdImage}
              setIsForm={setIsForm}
            />
          ) : null}
        </Grid>
        <Grid item xs={12} md={4} display="center" justifyContent="center">
          <LazyLoadImage
            // src={`${UrlBase}${
            //   idImage == 10158 ? "pikachu-partner" : idImage
            // }.png`}
            src={data?.artwork_url}
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
