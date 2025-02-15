import { Paper, Stack, useTheme } from "@mui/material";
import React, { JSX } from "react";

import { ShareListProps } from "./ShareList.props";

import ShareItem from "../ShareItem";

import { useGetLinkSharesQuery } from "../../slices/shareApiSlice";

const LinkListComponent = (props: ShareListProps): JSX.Element => {
  const { linkId } = props;

  const theme = useTheme();

  const { data: shares = { message: "", data: [] } } = useGetLinkSharesQuery({
    linkId,
  });

  return (
    <Stack spacing={4}>
      {shares.data.map((share) => (
        <Paper elevation={3} sx={{ padding: theme.spacing(3) }} key={share.id}>
          <ShareItem linkId="" />
        </Paper>
      ))}
    </Stack>
  );
};

export default React.memo(LinkListComponent);
