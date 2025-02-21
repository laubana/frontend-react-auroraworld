import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { JSX, useEffect, useState } from "react";

import { SearchProps } from "./Search.props";

import InputText from "../InputText";

import useDebounce from "../../hooks/useDebounce";
import useSearch from "../../hooks/useSearch";

const SearchComponent = (props: SearchProps): JSX.Element => {
  const { categories } = props;

  const theme = useTheme();

  const { handleChangeSearchCategoryId, handleChangeSearchName } = useSearch();

  const [searchCategoryId, setSearchCategoryId] = useState<string>("all");
  const [searchName, setSearchName] = useState<string>("");

  const debouncedSearchName = useDebounce<string>(searchName, 1000);

  useEffect(() => {
    handleChangeSearchCategoryId(searchCategoryId);
  }, [searchCategoryId, handleChangeSearchCategoryId]);

  useEffect(() => {
    handleChangeSearchName(debouncedSearchName);
  }, [debouncedSearchName, handleChangeSearchName]);

  return (
    <Stack spacing={4} alignItems={{ xs: "stretch", sm: "center" }}>
      <Typography
        variant="h6"
        sx={{
          textTransform: "uppercase",
          letterSpacing: theme.typography.fontSize,
        }}
        alignSelf="start"
      >
        Search Link
      </Typography>
      <Stack
        spacing={4}
        direction={{ xs: "column", sm: "row" }}
        alignSelf="stretch"
      >
        <FormControl fullWidth>
          <InputLabel id={`categories`}>Category</InputLabel>
          <Select
            fullWidth
            labelId={`categories`}
            label="Category"
            value={searchCategoryId}
            onChange={(event) => setSearchCategoryId(event.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((category) => (
              <MenuItem value={category.id} key={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <InputText label="Name" text={searchName} setText={setSearchName} />
      </Stack>
    </Stack>
  );
};

export default React.memo(SearchComponent);
