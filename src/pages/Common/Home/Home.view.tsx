import { Container, Stack } from "@mui/material";

import LinkList from "../../../components/LinkList";
import Search from "../../../components/Search";
import LinkForm from "../../../forms/LinkForm";
import { useGetCategoriesQuery } from "../../../slices/categoryApiSlice";
import { useGetUsersQuery } from "../../../slices/userApiSlice";

const HomeView = () => {
  const { data: users = { message: "", data: [] } } = useGetUsersQuery();
  const { data: categories = { message: "", data: [] } } =
    useGetCategoriesQuery();

  return (
    <Container maxWidth="xl">
      <Stack spacing={4}>
        <LinkForm categories={categories.data} />
        <Search categories={categories.data} />
        <LinkList categories={categories.data} users={users.data} />
      </Stack>
    </Container>
  );
};

export default HomeView;
