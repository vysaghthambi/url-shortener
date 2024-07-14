"use client";

import { PaletteOptions, experimental_extendTheme as extendTheme } from "@mui/material/styles";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

const darkPalette: PaletteOptions = {
  primary: { main: "#fff" },
  secondary: { main: "#f7fafc" },
  info: { main: "#4383cb" },

  background: { default: "#2b2b2b", paper: "#1a324c" },
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
