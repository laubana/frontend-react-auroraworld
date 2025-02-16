import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import React, { JSX } from "react";

import { LinkListProps } from "./LinkList.props";

import LinkCard from "../LinkCard";
import Loader from "../Loader";

import { useSearchContext } from "../../contexts/SearchContext";
import { useGetLinksQuery } from "../../slices/linkApiSlice";

const LinkListComponent = (props: LinkListProps): JSX.Element => {
  const { users } = props;

  const theme = useTheme();

  const { searchCategoryId, searchName } = useSearchContext();

  const {
    data: links = { message: "", data: [] },
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
      <Typography>My Links</Typography>
      {isOwnLinksFetching ? (
        <Loader />
      ) : 0 < links.data.length ? (
        links.data.map((link) => (
          <Paper elevation={3} sx={{ padding: theme.spacing(4) }} key={link.id}>
            <LinkCard {...link} linkId={link.id} users={users} owned />
          </Paper>
        ))
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography>No item found.</Typography>
        </Box>
      )}
      <Typography>Shared Links</Typography>
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
              <LinkCard {...link} linkId={link.id} users={users} />
            </Paper>
          ))}
          {sharedWritableLinks.data.map((link) => (
            <Paper
              elevation={3}
              sx={{ padding: theme.spacing(4) }}
              key={link.id}
            >
              <LinkCard {...link} linkId={link.id} users={users} writable />
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
