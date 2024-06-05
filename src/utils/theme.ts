"use client";

import { PaletteOptions, experimental_extendTheme as extendTheme } from "@mui/material/styles";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

const darkPalette: PaletteOptions = {
  primary: { main: "#8cb0d9" },
  secondary: { main: "#f7fafc" },
  info: { main: "#4383cb" },

  background: { default: "#0d1926", paper: "#1a324c" },
};

export const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: darkPalette,
    },
  },
  typography: {
    ...montserrat.style,
  },
});
