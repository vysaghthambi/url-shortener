import Link from "next/link";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import style from "./Header.module.css";

export default function Header() {
  return (
    <AppBar component="nav" position="sticky" className={style.AppBar}>
      <Toolbar>
        <Typography fontSize="2rem" fontWeight="700" color="primary.main" flexGrow={1}>
          <Link href="/">URL Shortener</Link>
        </Typography>
        <Link href="/api/auth/signin">SignIn</Link>
      </Toolbar>
    </AppBar>
  );
}
