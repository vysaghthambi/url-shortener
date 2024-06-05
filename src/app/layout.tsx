import type { Metadata } from "next";

import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import { theme } from "@/utils/theme";

import "./globals.css";

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Creates short URL with a long URL input",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CssVarsProvider theme={theme} defaultMode="dark">
          {children}
        </CssVarsProvider>
      </body>
    </html>
  );
}
