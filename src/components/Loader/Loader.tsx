import { Box, useTheme } from "@mui/material";
import React, { JSX } from "react";
import { BeatLoader } from "react-spinners";

const LinkListComponent = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <BeatLoader color={theme.palette.primary.main} />
    </Box>
  );
};

export default React.memo(LinkListComponent);
