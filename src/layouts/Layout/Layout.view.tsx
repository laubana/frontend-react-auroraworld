import { Button, Typography } from "@mui/material";
import React, { JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useMediaQuery } from "react-responsive";
import { Link, Outlet, useNavigate } from "react-router-dom";

import {
  selectAccessToken,
  selectEmail,
  selectId,
  setAuth,
} from "../../slices/authSlice";
import { store } from "../../configs/storeConfig";
import { useSignOutMutation } from "../../slices/authApiSlice";

const LayoutComponent = (): JSX.Element => {
  const navigate = useNavigate();

  const accessToken = useSelector(selectAccessToken);
  const id = useSelector(selectId);
  const email = useSelector(selectEmail);

  const dispatch = useDispatch<typeof store.dispatch>();
  const [signOut] = useSignOutMutation();

  // const isMobileDevice = useMediaQuery({ maxWidth: 767 });

  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(setAuth({ accessToken: "", email: "", id: "" }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header>
        <Typography>{email}</Typography>
        <Button variant="contained" onClick={handleSignOut}>
          Sign Out
        </Button>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Typography>© 2025, Yuhwan Ban</Typography>
      </footer>
    </>
  );
};

export default React.memo(LayoutComponent);
