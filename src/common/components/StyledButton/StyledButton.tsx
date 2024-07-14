"use client";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 500,
  color: theme.palette.primary.main,
  padding: "0.5rem 2rem",
  textTransform: "uppercase",
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: 15,
  backgroundColor: "transparent",
  transition: "backgroundColor 500ms",

  width: "fit-content",

  "&:hover": {
    color: theme.palette.background.default,
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
}));
