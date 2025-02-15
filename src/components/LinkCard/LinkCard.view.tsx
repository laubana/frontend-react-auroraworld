import { Stack, Typography } from "@mui/material";
import React, { JSX } from "react";

import { LinkCardProps } from "./LinkCard.props";
import ShareForm from "../../forms/ShareForm";

const LinkCardComponent = (props: LinkCardProps): JSX.Element => {
  const { linkId, category, name, url, users } = props;

  return (
    <Stack spacing={4}>
      <Typography>Links</Typography>
      <Typography>{category}</Typography>
      <Typography>{name}</Typography>
      <Typography>{url}</Typography>
      <ShareForm linkId={linkId} users={users} />
    </Stack>
  );
};

export default React.memo(LinkCardComponent);
