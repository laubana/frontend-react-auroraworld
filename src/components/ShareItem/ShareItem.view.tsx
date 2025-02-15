import { Stack, Typography } from "@mui/material";
import React, { JSX } from "react";

import { ShareItemProps } from "./ShareItem.props";

const ShareItemComponent = (props: ShareItemProps): JSX.Element => {
  const { linkId, user } = props;

  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <Typography>{user.email}</Typography>
    </Stack>
  );
};

export default React.memo(ShareItemComponent);
