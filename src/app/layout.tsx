import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import { theme } from "@/utils/theme";

import Header from "@/components/Header/Header";
import SessionProvider from "@/context/SessionProvider";

import { authOptions } from "./api/auth/[...nextauth]/options";

import "./globals.css";

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Creates short URL with a long URL input",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <CssVarsProvider theme={theme} defaultMode="dark">
          <SessionProvider session={session}>
            <Header />
            <main>{children}</main>
          </SessionProvider>
        </CssVarsProvider>
      </body>
    </html>
  );
}
