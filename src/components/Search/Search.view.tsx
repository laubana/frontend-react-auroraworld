import {
  FormControl,
  InputLabel,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { JSX, useEffect, useState } from "react";

import { SearchProps } from "./Search.props";

import InputText from "../InputText";

import { useSearchContext } from "../../contexts/SearchContext";
import useDebounce from "../../hooks/useDebounce";

const SearchComponent = (props: SearchProps): JSX.Element => {
  const { handleChangeSearchCategoryId, handleChangeSearchName } =
    useSearchContext();

  const [searchCategoryId, setSearchCategoryId] = useState<string>("");
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
      <Typography alignSelf="start">Search Link</Typography>
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
            {categories.map((category) => (
              <MenuItem value={category.id} key={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          {touched.category && (
            <FormHelperText>{errors.category}</FormHelperText>
          )}
        </FormControl>
        <InputText
          label="Category"
          text={searchCategoryId}
          setText={setSearchCategoryId}
        />

        <InputText label="Name" text={searchName} setText={setSearchName} />
      </Stack>
    </Stack>
  );
};

export default React.memo(SearchComponent);
