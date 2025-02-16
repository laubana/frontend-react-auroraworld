import { Container, Paper, Stack, useTheme } from "@mui/material";

import LinkList from "../../../components/LinkList";
import Search from "../../../components/Search";
import CategoryForm from "../../../forms/CategoryForm";
import LinkForm from "../../../forms/LinkForm";
import { useGetCategoriesQuery } from "../../../slices/categoryApiSlice";
import { useGetUsersQuery } from "../../../slices/userApiSlice";

const HomeView = () => {
  const theme = useTheme();

  const { data: users = { message: "", data: [] } } = useGetUsersQuery();
  const { data: categories = { message: "", data: [] } } =
    useGetCategoriesQuery();

  return (
    <Container maxWidth="xl">
      <Stack spacing={4}>
        <Paper elevation={3} sx={{ padding: theme.spacing(4) }}>
          <CategoryForm />
        </Paper>
        <Paper elevation={3} sx={{ padding: theme.spacing(4) }}>
          <LinkForm categories={categories.data} />
        </Paper>
        <Paper elevation={3} sx={{ padding: theme.spacing(4) }}>
          <Search categories={categories.data} />
        </Paper>
        <Paper elevation={3} sx={{ padding: theme.spacing(4) }}>
          <LinkList users={users.data} />
        </Paper>
      </Stack>
    </Container>
  );
};

export default HomeView;
