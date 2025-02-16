import { Box, Container, Paper, useTheme } from "@mui/material";

import SignInForm from "../../../forms/SignInForm";

const SignInView = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: theme.spacing(4) }}>
          <SignInForm />
        </Paper>
      </Container>
    </Box>
  );
};

export default SignInView;
