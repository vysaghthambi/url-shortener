"use client";

import { ChangeEvent, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import { StyledButton } from "@/common/components/StyledButton/StyledButton";

import { createShortUrl } from "@/app/actions";

import style from "./URLShortener.module.css";

export default function URLShortener() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (helperText) {
      setHelperText("");
    }

    if (shortUrl) {
      setShortUrl("");
    }

    setLongUrl(event.target.value);
  };

  const handleUrlShorten = async () => {
    try {
      new URL(longUrl);
    } catch (error) {
      console.error(error);
      setHelperText("Enter a valid URL");
      return;
    }

    const shortenedUrl = await createShortUrl(longUrl);

    setShortUrl(shortenedUrl);
  };

  const handleCopyText = async () => {
    await navigator.clipboard.writeText(shortUrl);

    setCopied(true);
  };

  return (
    <Stack flexGrow={1} justifyContent="center" alignItems="center">
      <Box className={style.InputContainer}>
        <TextField
          placeholder="Paste your URL"
          fullWidth
          value={longUrl}
          onChange={handleChange}
          autoComplete="off"
          helperText={helperText}
        />
        <StyledButton onClick={handleUrlShorten} disabled={!longUrl}>
          Shorten
        </StyledButton>
        {shortUrl && (
          <Tooltip title={copied ? "Copied" : "Click to copy"}>
            <Typography
              color="primary.main"
              fontSize="1.6rem"
              mt={2}
              onClick={handleCopyText}
              sx={{ cursor: "pointer" }}
            >
              {shortUrl}
            </Typography>
          </Tooltip>
        )}
      </Box>
    </Stack>
  );
}
