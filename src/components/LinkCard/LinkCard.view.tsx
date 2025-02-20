import { Box, Button, Stack, Typography } from "@mui/material";
import React, { JSX, useState } from "react";
import toast from "react-hot-toast";

import {
  LinkCardOwnedProps,
  LinkCardUnwritableProps,
  LinkCardWritableProps,
} from "./LinkCard.props";

import ShareList from "../ShareList";

import LinkForm from "../../forms/LinkForm";
import { useDeleteLinkMutation } from "../../slices/linkApiSlice";

const LinkCardComponent = (
  props: LinkCardOwnedProps | LinkCardUnwritableProps | LinkCardWritableProps
): JSX.Element => {
  const {
    linkId,
    categories,
    categoryId,
    categoryName,
    name,
    url,
    own,
    writable,
  } = props;

  const [deleteLink] = useDeleteLinkMutation();

  const [isUpdating, setisUpdating] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      const response = await deleteLink({ linkId }).unwrap();

      toast.success(response.message);
    } catch (error) {
      console.error(error);

      toast.error((error as { data: { message: string } }).data.message);
    }
  };

  const handleUpdate = () => {
    setisUpdating(true);
  };

  const handleCancel = () => {
    setisUpdating(false);
  };

  return (
    <Stack spacing={4}>
      {own && (
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      )}
      {isUpdating && (own || writable) ? (
        <LinkForm
          mode="update"
          linkId={linkId}
          categories={categories}
          categoryId={categoryId}
          name={name}
          url={url}
        />
      ) : (
        <>
          <Typography>{categoryName}</Typography>
          <Typography>{name}</Typography>
          <Typography>{url}</Typography>
        </>
      )}
      {(own || writable) && (
        <Stack spacing={4} alignItems={{ xs: "stretch", sm: "center" }}>
          {isUpdating ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          ) : (
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          )}
        </Stack>
      )}
      {own && <ShareList linkId={linkId} />}
    </Stack>
  );
};

export default React.memo(LinkCardComponent);
