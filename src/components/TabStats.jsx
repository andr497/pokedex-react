import React, { useState, useEffect } from "react";

import { keyframes, styled, useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import {
  calculateStatsPokemon,
  fixStatsName,
  wc_hex_is_light,
} from "./../helpers";

import useWidth from "../hooks/useWidth";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))((props) => ({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: props.typecolor,
  },
}));

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
    "&.Mui-selected": {
      color: theme.palette.text.primary,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

const animationKeyframes = (typecolor) => {
  return keyframes({
    "0%": {
      background: `linear-gradient(45deg, ${typecolor[0]}, ${typecolor[1]})`,
    },
    "50%": {
      background: `linear-gradient(45deg, ${typecolor[1]}, ${typecolor[0]})`,
    },
    "100%": {
      background: `linear-gradient(45deg, ${typecolor[0]}, ${typecolor[1]})`,
    },
  });
};

const ProgressBarStat = styled(LinearProgress)(({ theme, typecolor }) => ({
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    //backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
  "& .MuiLinearProgress-bar": {
    // apply a new animation-duration to the `.bar` class
    //background: `repeating-linear-gradient(45deg,${typecolor[0]},${typecolor[0]} 10px,${typecolor[1]} 10px,${typecolor[1]} 20px)`,
    //animation: `${animationKeyframes(typecolor)} 2s ease-in-out`,
    //animationIterationCount: "infinite",
    background: `linear-gradient(45deg, ${typecolor[0]}, ${typecolor[1]})`,
  },
}));

function LinearProgressWithLabel(props) {
  const theme = useTheme();
  const labelValue = Math.round(props.label).toString();

  let calculateSpace = 100 - props.value;

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <ProgressBarStat variant="determinate" {...props} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: `${calculateSpace}%`,
          transition: "all ease-in-out .5s",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: wc_hex_is_light(props.typecolor[1]) ? "white" : "black",
            fontWeight: "bold",
            mr: 0.5,
          }}
        >{`${labelValue}`}</Typography>
      </Box>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </Box>
  );
}

const TabsContent = ({ value, datos, colorType }) => {
  return (
    <TabPanel value={value} index={value}>
      <Table>
        <TableBody sx={{ p: 3 }}>
          {datos?.map((value, key) => (
            <TableRow key={key}>
              <TableCell
                component="th"
                scope="row"
                align="right"
                sx={{
                  textTransform: "capitalize",
                  border: "none",
                }}
              >
                {fixStatsName(value.name)}
              </TableCell>
              <TableCell
                sx={{
                  width: "100%",
                  border: "none",
                }}
              >
                {/* <ProgressBarStat
                  variant="determinate"
                  value={value.percentage}
                  label={value.base_stat}
                  typecolor={colorType}
                /> */}
                <LinearProgressWithLabel
                  value={value.percentage}
                  variant="determinate"
                  label={value.base_stat}
                  description={value.name}
                  typecolor={colorType}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TabPanel>
  );
};

const TabStats = ({ stats, pokemonId, colorType }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [valueStats, setValueStats] = useState([]);
  const [maxPokemonStats, setMaxPokemonStats] = useState([]);
  const [minPokemonStats, setMinPokemonStats] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (typeof stats !== "undefined") {
      const { baseStats, maxStats, minStats } = calculateStatsPokemon(
        stats,
        pokemonId
      );

      setValueStats(baseStats);
      setMaxPokemonStats(maxStats);
      setMinPokemonStats(minStats);
    }
  }, [stats, pokemonId]);

  const statsContent = [valueStats, minPokemonStats, maxPokemonStats];
  const styledTabLabels = ["BASE", "MIN", "MAX"];

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          color: theme.palette.text.primary,
          borderRadius: "10px",
        }}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
          typecolor={colorType}
        >
          {styledTabLabels.map((value, key) => (
            <StyledTab key={`styled-tab-${key}`} label={value} />
          ))}
        </StyledTabs>
        {/*statsContent.map((v, i) => (
          <TabsContent
            key={i}
            value={value}
            index={i}
            datos={v}
            colorType={colorType}
          />
        ))*/}
        <TabsContent
          value={value}
          datos={statsContent[value]}
          colorType={colorType}
        />
      </Box>
    </Box>
  );
};

export default TabStats;
