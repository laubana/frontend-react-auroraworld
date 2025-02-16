import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { store } from "../../configs/storeConfig";
import {
  selectAccessToken,
  selectEmail,
  selectId,
  setAuth,
} from "../../slices/authSlice";
import { useSignOutMutation } from "../../slices/authApiSlice";

const LayoutComponent = (): JSX.Element => {
  const theme = useTheme();

  const accessToken = useSelector(selectAccessToken);
  const id = useSelector(selectId);
  const email = useSelector(selectEmail);

  const dispatch = useDispatch<typeof store.dispatch>();
  const [signOut] = useSignOutMutation();

  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(setAuth({ accessToken: "", id: "", email: "" }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header>
        <Typography>{email}</Typography>
        <Button variant="contained" color="secondary" onClick={handleSignOut}>
          Sign Out
        </Button>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={theme.spacing(8)}
        >
          <Typography>© 2025, Yuhwan Ban</Typography>
        </Box>
      </footer>
    </>
  );
};

export default React.memo(LayoutComponent);
