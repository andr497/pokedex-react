import React, { createContext, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useLocalStorage from "../hooks/useLocalStorage";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ThemeContext(props) {
  const [mode, setMode] = useLocalStorage("theme", "light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [setMode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
