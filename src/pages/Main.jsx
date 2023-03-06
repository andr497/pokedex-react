import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

import { useDispatch, useSelector } from "react-redux";
import { getAllPokemon, selectDataPokemon } from "./../reducers/pokemon";

import PokemonBasicCard from "../components/PokemonBasicCard";

import MyPagination from "./../components/MyPagination";
import { LIMIT_PAGE } from "../helpers/constants";

const Main = () => {
  const data = useSelector(selectDataPokemon);
  const loading = useSelector((state) => state.pokemon.loading);

  const dispatch = useDispatch();

  const query = new URLSearchParams(window.location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(page);

  const countAndLimit = data?.count / LIMIT_PAGE;

  let countPages = 1;

  if (data?.count !== null) {
    countPages =
      countAndLimit % 1 === 0 ? countAndLimit : Math.trunc(countAndLimit) + 1;
  }

  useEffect(() => {
    dispatch(getAllPokemon(currentPage));
    window.scrollTo({ top: 0 });
  }, [dispatch, currentPage]);

  const afterPage = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = (
    <Grid
      container
      item
      marginTop={4}
      marginBottom={4}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid item>
        <MyPagination
          page={currentPage}
          count={isNaN(countPages) ? 1 : countPages}
          pageClicked={(e) => {
            afterPage(e);
          }}
        />
      </Grid>
    </Grid>
  );

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Grid
      container
      component="article"
      maxWidth="xl"
      width="100%"
      height="100%"
    >
      {renderPagination}
      {`${windowSize.width} x ${windowSize.height}`}
      <Grid container item spacing={{ xs: 1, md: 2 }}>
        {!loading
          ? data?.results.map((value) => (
              <Grid key={value.id} item xs={12} sm={6} md={4} lg={3}>
                <PokemonBasicCard
                  id={value.id}
                  name={value.name}
                  types={value.types}
                />
              </Grid>
            ))
          : Array.from(new Array(LIMIT_PAGE)).map((value, key) => (
              <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  sx={{
                    width: "100%",
                    height: "311px",
                    boxSizing: "border-box",
                  }}
                />
              </Grid>
            ))}
      </Grid>
      {renderPagination}
    </Grid>
  );
};

export default Main;
