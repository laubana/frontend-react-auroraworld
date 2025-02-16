import { Paper, Stack, useTheme } from "@mui/material";
import React, { JSX } from "react";

import { ShareListProps } from "./ShareList.props";

import ShareItem from "../ShareItem";

import { useGetSharesQuery } from "../../slices/shareApiSlice";

const LinkListComponent = (props: ShareListProps): JSX.Element => {
  const { linkId } = props;

  const theme = useTheme();

  const { data: shares = { message: "", data: [] } } = useGetSharesQuery({
    linkId,
  });

  return (
    <Stack spacing={4}>
      {shares.data.map((share) => (
        <Paper elevation={3} sx={{ padding: theme.spacing(4) }} key={share.id}>
          <ShareItem
            shareId={share.id}
            email={share.user_email}
            isWritable={share.is_writable === 1 ? true : false}
          />
        </Paper>
      ))}
    </Stack>
  );
};

export default React.memo(LinkListComponent);
