import { Box, Container, Paper, Stack, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import SignUpForm from "../../../forms/SignUpForm";

const SignUpView = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Container maxWidth="sm">
        <Stack spacing={4}>
          <Link to="/">
            <img src="/logo.svg" width="50%" />
          </Link>
          <Paper elevation={3} sx={{ padding: theme.spacing(4) }}>
            <SignUpForm />
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignUpView;
