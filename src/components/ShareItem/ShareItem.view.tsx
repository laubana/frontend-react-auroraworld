import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, JSX } from "react";
import toast from "react-hot-toast";

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
      const response = await updateShare({
        shareId,
        isWritable: event.target.checked ? true : false,
      }).unwrap();

      toast.success(response.message);
    } catch (error) {
      console.error(error);

      toast.error((error as { data: { message: string } }).data.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteShare({ shareId }).unwrap();

      toast.success(response.message);
    } catch (error) {
      console.error(error);

      toast.error((error as { data: { message: string } }).data.message);
    }
  };

  return (
    <Stack
      spacing={2}
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "stretch", sm: "center" }}
    >
      <Typography sx={{ wordBreak: "break-all" }}>{email}</Typography>
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
