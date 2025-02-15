import { Paper, Stack, useTheme } from "@mui/material";
import React, { JSX } from "react";

import { LinkListProps } from "./LinkList.props";

import LinkCard from "../LinkCard";

import { useGetOwnLinksQuery } from "../../slices/linkApiSlice";

const LinkListComponent = (props: LinkListProps): JSX.Element => {
  const { users } = props;

  const theme = useTheme();

  const { data: links = { message: "", data: [] } } = useGetOwnLinksQuery();

  return (
    <Stack spacing={4}>
      {links.data.map((link) => (
        <Paper elevation={3} sx={{ padding: theme.spacing(3) }} key={link.id}>
          <LinkCard {...link} linkId={link.id} users={users} />
        </Paper>
      ))}
    </Stack>
  );
};

export default React.memo(LinkListComponent);
