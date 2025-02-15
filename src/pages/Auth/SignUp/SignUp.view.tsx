import { Box, Container, Paper, useTheme } from "@mui/material";

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
        <Paper elevation={3} sx={{ padding: theme.spacing(3) }}>
          <SignUpForm />
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUpView;
