import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, JSX } from "react";

import { ShareItemProps } from "./ShareItem.props";
import {
  useDeleteShareMutation,
  useUpdateShareMutation,
} from "../../slices/shareApiSlice";

const ShareItemComponent = (props: ShareItemProps): JSX.Element => {
  const { shareId, email, isWritable } = props;

  const [deleteShare] = useDeleteShareMutation();
  const [updateShare] = useUpdateShareMutation();

  const handleUpdate = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      await updateShare({
        shareId,
        isWritable: event.target.checked ? true : false,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteShare({ shareId }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <Typography>{email}</Typography>
      <FormControlLabel
        control={<Checkbox checked={isWritable} onChange={handleUpdate} />}
        label="Writable"
      />
      <Button variant="contained" onClick={handleDelete}>
        Delete
      </Button>
    </Stack>
  );
};

export default React.memo(ShareItemComponent);
