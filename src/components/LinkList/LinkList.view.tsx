import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import React, { JSX } from "react";

import { LinkListProps } from "./LinkList.props";

import LinkCard from "../LinkCard";
import Loader from "../Loader";

import useSearch from "../../hooks/useSearch";
import { useGetLinksQuery } from "../../slices/linkApiSlice";

const LinkListComponent = (props: LinkListProps): JSX.Element => {
  const { categories } = props;

  const theme = useTheme();

  const { searchCategoryId, searchName } = useSearch();

  const {
    data: ownLinks = { message: "", data: [] },
    isFetching: isOwnLinksFetching,
  } = useGetLinksQuery({
    mode: "own",
    categoryId: searchCategoryId || "",
    name: searchName || "",
  });

  const {
    data: sharedUnwritableLinks = { message: "", data: [] },
    isFetching: isSharedUnwritableLinksFetching,
  } = useGetLinksQuery({
    mode: "shared-unwritable",
    categoryId: searchCategoryId || "",
    name: searchName || "",
  });

  const {
    data: sharedWritableLinks = { message: "", data: [] },
    isFetching: isSharedWritableLinksFetching,
  } = useGetLinksQuery({
    mode: "shared-writable",
    categoryId: searchCategoryId || "",
    name: searchName || "",
  });

  return (
    <Stack spacing={4}>
      <Typography variant="h3">Own Links</Typography>
      {isOwnLinksFetching ? (
        <Loader />
      ) : 0 < ownLinks.data.length ? (
        ownLinks.data.map((link) => (
          <Paper elevation={3} sx={{ padding: theme.spacing(2) }} key={link.id}>
            <LinkCard
              {...link}
              linkId={link.id}
              categories={categories}
              categoryId={link.category_id}
              categoryName={link.category_name}
              own
            />
          </Paper>
        ))
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography>No item found.</Typography>
        </Box>
      )}
      <Typography variant="h3">Shared Links</Typography>
      {isSharedUnwritableLinksFetching || isSharedWritableLinksFetching ? (
        <Loader />
      ) : 0 < sharedUnwritableLinks.data.length ||
        0 < sharedWritableLinks.data.length ? (
        <>
          {sharedUnwritableLinks.data.map((link) => (
            <Paper
              elevation={3}
              sx={{ padding: theme.spacing(4) }}
              key={link.id}
            >
              <LinkCard
                {...link}
                linkId={link.id}
                categoryId={link.category_id}
                categoryName={link.category_name}
              />
            </Paper>
          ))}
          {sharedWritableLinks.data.map((link) => (
            <Paper
              elevation={3}
              sx={{ padding: theme.spacing(4) }}
              key={link.id}
            >
              <LinkCard
                {...link}
                linkId={link.id}
                categories={categories}
                categoryId={link.category_id}
                categoryName={link.category_name}
                writable
              />
            </Paper>
          ))}
        </>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography>No item found.</Typography>
        </Box>
      )}
    </Stack>
  );
};

export default React.memo(LinkListComponent);
