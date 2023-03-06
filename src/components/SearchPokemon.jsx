import React, { useState, useEffect } from "react";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import LoadingButton from "@mui/lab/LoadingButton";

import SearchIcon from "@mui/icons-material/Search";

import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonByIdNoDispatch,
  selectDataPokemonId,
} from "./../reducers/pokemon";
import { useNavigate } from "react-router-dom";

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme, isFocus }) => {
  return {
    padding: isFocus ? theme.spacing(0, 2) : theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: isFocus ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
  };
});

const StyledInputBase = styled(InputBase)(({ theme, ...props }) => {
  const spacing = props["data-is-focus"] ? 4 : 0;
  return {
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      paddingLeft: `calc(1em + ${theme.spacing(spacing)})`,
      transition: `${theme.transitions.create(
        "width"
      )}, ${theme.transitions.create("padding-left")}`,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  };
});

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  borderColor: alpha(theme.palette.common.white, 0.15),
  color: alpha(theme.palette.common.white, 0.45),
  "&:hover": {
    backgroundColor: "transparent",
    borderColor: alpha(theme.palette.common.white, 0.25),
    color: alpha(theme.palette.common.white, 0.75),
  },
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderTopRightRadius: "50% 85%",
  borderBottomRightRadius: "50% 85%",
}));

const SearchPokemon = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [isFocus, setIsFocus] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    let current = e.currentTarget;
    setValue(current.value);
  };

  const handleOnClick = (e) => {
    e.preventDefault();

    const formatValue = value.replace(" ", "-");

    setLoading(true);
    getPokemonByIdNoDispatch(formatValue)
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      console.log(data);
      navigate(`/pokemon/${data.id}`);
    }

    if (error) {
      console.log(error);

      const formatValue = value.replace(" ", "-");
      navigate(`/pokemon/${formatValue}`);
    }

    setValue("");
  }, [data, error]);

  return (
    <>
      <Search onSubmit={handleOnClick}>
        <SearchIconWrapper isFocus={isFocus}>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search..."
          value={value}
          onChange={handleOnChange}
          data-is-focus={isFocus}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <StyledLoadingButton
        className={"jose_class"}
        variant="outlined"
        loading={loading}
        size="large"
        type="button"
        onClick={handleOnClick}
        disabled={value === ""}
        startIcon={<SearchIcon />}
      />
    </>
  );
};

export default SearchPokemon;
