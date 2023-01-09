import React, { useState, useEffect } from "react";

import { styled, useTheme } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import {
  calculateStatsPokemon,
  fixPokemonName,
  fixStatsName,
} from "./../helpers";

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
    background: `repeating-linear-gradient(45deg,${typecolor[0]},${typecolor[0]} 10px,${typecolor[1]} 10px,${typecolor[1]} 20px)`,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function TableStats({ stats, pokemonId, colorType }) {
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

  console.log(statsContent);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Base</TableCell>
            <TableCell align="right">MIN</TableCell>
            <TableCell align="right">MAX</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {valueStats.map((row) => {
            return (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
