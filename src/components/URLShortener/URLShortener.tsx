"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (longUrl) return;

    setShortUrl("");
  }, [longUrl])

  const handleUrlShorten = async () => {
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
          onChange={(event) => setLongUrl(event.target.value)}
          autoComplete="off"
        />
        <StyledButton onClick={handleUrlShorten} disabled={!longUrl}>
          Shorten
        </StyledButton>
        {shortUrl && (
          <Tooltip title={copied ? "Copied" : "Click to copy"}>
            <Typography
              color="secondary.main"
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
