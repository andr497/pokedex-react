import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const ErrorPage = ({
  title = "Oops! Something is wrong",
  message = "The pokemon you're looking for might be not exist or is not added yet.",
  urlOptions = {
    tag: "Go to Home",
    link: "/",
  },
}) => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        display: "grid",
        placeItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <img
        src="/pikachu.png"
        style={{
          maxWidth: "420px",
          width: "100%",
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
          {title}
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
          {message}
        </Typography>
        <Typography
          as={Link}
          variant="button"
          to={urlOptions.link}
          sx={{
            color: theme.palette.text.primary,
            textDecoration: "none",
            transition: "all ease-in-out .5s",
            "&:hover": {
              color: theme.palette.text.disabled,
            },
          }}
        >
          {urlOptions.tag}
        </Typography>
      </Box>
    </Container>
  );
};

export default ErrorPage;
