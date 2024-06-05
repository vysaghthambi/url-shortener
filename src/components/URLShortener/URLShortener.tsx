"use client";

import { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { StyledButton } from "@/common/components/StyledButton/StyledButton";

import style from "./URLShortener.module.css";

export default function URLShortener() {
  const [longUrl, setLongUrl] = useState<string>("");

  return (
    <Stack flexGrow={1} justifyContent="center" alignItems="center">
      <Box className={style.InputContainer}>
        <TextField
          placeholder="Paste your URL"
          fullWidth
          value={longUrl}
          onChange={(event) => setLongUrl(event.target.value)}
        />
        <StyledButton>Shorten</StyledButton>
      </Box>
    </Stack>
  );
}
