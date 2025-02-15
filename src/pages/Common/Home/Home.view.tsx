import { Container, Paper, Stack, useTheme } from "@mui/material";

import LinkList from "../../../components/LinkList";
import LinkForm from "../../../forms/LinkForm";
import { useGetUsersQuery } from "../../../slices/userApiSlice";

const HomeView = () => {
  const theme = useTheme();

  const { data: users = { message: "", data: [] } } = useGetUsersQuery();

  return (
    <Container maxWidth="xl">
      <Stack spacing={4}>
        <Paper elevation={3} sx={{ padding: theme.spacing(3) }}>
          <LinkForm />
        </Paper>
        <Paper elevation={3} sx={{ padding: theme.spacing(3) }}>
          <LinkList users={users.data} />
        </Paper>
      </Stack>
    </Container>
  );
};

export default HomeView;
