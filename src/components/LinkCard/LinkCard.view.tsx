import { Button, Stack, Typography } from "@mui/material";
import React, { JSX, useState } from "react";

import { LinkCardProps } from "./LinkCard.props";

import ShareList from "../ShareList";

import LinkForm from "../../forms/LinkForm";
import ShareForm from "../../forms/ShareForm";
import { useDeleteLinkMutation } from "../../slices/linkApiSlice";

const LinkCardComponent = (props: LinkCardProps): JSX.Element => {
  const { linkId, category, name, url, users = [], owned, writable } = props;

  const [deleteLink] = useDeleteLinkMutation();

  const [isUpdating, setisUpdating] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      await deleteLink({ linkId }).unwrap();
    } catch (error) {
      console.error(error);
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
      {isUpdating ? (
        <LinkForm
          mode="update"
          linkId={linkId}
          category={category}
          name={name}
          url={url}
        />
      ) : (
        <>
          <Typography>{category}</Typography>
          <Typography>{name}</Typography>
          <Typography>{url}</Typography>
        </>
      )}
      {(owned || writable) && (
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
          {owned && (
            <Button variant="contained" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Stack>
      )}
      {owned && (
        <>
          <ShareForm linkId={linkId} users={users} />
          <ShareList linkId={linkId} />
        </>
      )}
    </Stack>
  );
};

export default React.memo(LinkCardComponent);
