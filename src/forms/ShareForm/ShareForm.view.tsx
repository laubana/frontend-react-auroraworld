import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { JSX, useState } from "react";
import * as Yup from "yup";

import { ShareFormProps } from "./ShareForm.props";

import { useAddShareMutation } from "../../slices/shareApiSlice";

type Form = {
  userId: string;
};

const ShareFormComponent = (props: ShareFormProps): JSX.Element => {
  const { linkId, users } = props;

  const [addShare] = useAddShareMutation();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const initialValues: Form = {
    userId: "",
  };

  const validationSchema = Yup.object().shape({
    userId: Yup.string().required("User is required."),
  });

  const handleSubmit = async () => {
    setIsVisible(true);
  };

  const handleShare = async (values: Form, isWritable: boolean) => {
    try {
      await addShare({ linkId, userId: values.userId, isWritable }).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setIsVisible(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({
        errors,
        handleSubmit,
        setFieldValue,
        setTouched,
        touched,
        values,
      }) => (
        <>
          <Stack spacing={4} alignItems={{ xs: "stretch", sm: "center" }}>
            <Typography alignSelf="start">Share Link</Typography>
            <Stack spacing={4} direction="row" alignSelf="stretch">
              <FormControl fullWidth error={errors.userId ? true : false}>
                <InputLabel id={`users-${linkId}`}>Users</InputLabel>
                <Select
                  fullWidth
                  labelId={`users-${linkId}`}
                  label="Users"
                  value={values.userId}
                  onChange={(event) => {
                    setTouched({ userId: true, ...touched });
                    setFieldValue("userId", event.target.value);
                  }}
                >
                  {users.map((user) => (
                    <MenuItem value={user.id} key={user.id}>
                      {user.email}
                    </MenuItem>
                  ))}
                </Select>
                {touched.userId && (
                  <FormHelperText>{errors.userId}</FormHelperText>
                )}
              </FormControl>
            </Stack>
            <Button onClick={() => handleSubmit()} variant="contained">
              Share
            </Button>
          </Stack>
          <Dialog open={isVisible} onClose={() => setIsVisible(false)}>
            <DialogTitle>
              Do you want to grant this user the authority to modify?
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => handleShare(values, true)}>Yes</Button>
              <Button onClick={() => handleShare(values, false)} autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Formik>
  );
};

export default React.memo(ShareFormComponent);
