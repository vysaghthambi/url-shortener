import Link from "next/link";
import { getServerSession } from "next-auth";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { StyledButton } from "@/common/components/StyledButton/StyledButton";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import style from "./Header.module.css";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <AppBar component="nav" position="sticky" className={style.AppBar}>
      <Toolbar>
        <Typography fontSize="2rem" fontWeight="700" color="primary.main" flexGrow={1}>
          <Link href="/">URL Shortener</Link>
        </Typography>
        {session ? (
          <Stack direction="row" alignItems="center" columnGap={1}>
            <Avatar src={session.user?.image ?? undefined} />
            <Typography fontSize="1.6rem">{session.user?.name?.toUpperCase()}</Typography>
            <Link href="/api/auth/signout">
              <StyledButton>
                <LogoutIcon fontSize="large" />
              </StyledButton>
            </Link>
          </Stack>
        ) : (
          <Link href="/api/auth/signin">
            <StyledButton endIcon={<LoginIcon />}>Login</StyledButton>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}
