import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import React, { JSX } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { store } from "../../configs/storeConfig";
import { selectEmail, setAuth } from "../../slices/authSlice";
import { useSignOutMutation } from "../../slices/authApiSlice";

const LayoutComponent = (): JSX.Element => {
  const theme = useTheme();

  const email = useSelector(selectEmail);

  const dispatch = useDispatch<typeof store.dispatch>();
  const [signOut] = useSignOutMutation();

  const handleSignOut = async () => {
    try {
      const response = await signOut().unwrap();

      dispatch(setAuth({ accessToken: "", id: "", email: "" }));

      toast.success(response.message);
    } catch (error) {
      console.error(error);

      toast.error((error as { data: { message: string } }).data.message);
    }
  };

  return (
    <>
      <header>
        <Container maxWidth="xl">
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            paddingY={theme.spacing(4)}
            gap={theme.spacing(4)}
          >
            <Typography>{email}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Box>
        </Container>
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
