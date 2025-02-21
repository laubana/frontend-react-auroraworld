import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { JSX, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { SharesFormProps } from "./SharesForm.props";

import useSearch from "../../hooks/useSearch";
import { useGetLinksQuery } from "../../slices/linkApiSlice";
import { useAddSharesMutation } from "../../slices/shareApiSlice";

type Form = {
  linkIds: string[];
  userIds: string[];
};

const TestFormComponent = (props: SharesFormProps): JSX.Element => {
  const { users } = props;

  const [addShares] = useAddSharesMutation();

  const { searchCategoryId, searchName } = useSearch();

  const {
    data: ownLinks = { message: "", data: [] },
    // isFetching: isOwnLinksFetching,
  } = useGetLinksQuery({
    mode: "own",
    categoryId: searchCategoryId || "",
    name: searchName || "",
  });

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const initialValues: Form = {
    linkIds: [],
    userIds: [],
  };

  const validationSchema = Yup.object().shape({
    linkIds: Yup.array(Yup.string())
      .min(1, "User is required.")
      .required("test"),
    userIds: Yup.array(Yup.string()).min(1, "User is required."),
  });

  const handleSubmit = async () => {
    setIsVisible(true);
  };

  const handleShare = async (
    values: Form,
    isWritable: boolean,
    resetForm: () => void
  ) => {
    try {
      const response = await addShares({
        linkIds: values.linkIds,
        userIds: values.userIds,
        isWritable,
      }).unwrap();

      resetForm();

      toast.success(response.message);
    } catch (error) {
      console.error(error);

      toast.error((error as { data: { message: string } }).data.message);
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
        handleSubmit,
        errors,
        resetForm,
        setFieldValue,
        setTouched,
        touched,
        values,
      }) => (
        <>
          <Stack spacing={4} alignItems={{ xs: "stretch", sm: "center" }}>
            <Typography variant="h3" alignSelf="start">
              Share Link
            </Typography>
            <Stack spacing={4} direction="row" alignSelf="stretch">
              <FormControl
                fullWidth
                error={touched.linkIds && errors.linkIds ? true : false}
              >
                <InputLabel id={`linkIds`}>Links</InputLabel>
                <Select
                  fullWidth
                  multiple
                  labelId={`linkIds`}
                  label="Links"
                  value={values.linkIds}
                  renderValue={(selectedValues) =>
                    selectedValues
                      .map(
                        (selectedValue) =>
                          ownLinks.data.find(
                            (ownLink) => ownLink.id === selectedValue
                          )?.name || ""
                      )
                      .join(", ")
                  }
                  input={<OutlinedInput label="Links" />}
                  onChange={(event) => {
                    setTouched({
                      linkIds: true,
                      ...touched,
                    });
                    setFieldValue("linkIds", event.target.value);
                  }}
                >
                  {ownLinks.data.map((link) => (
                    <MenuItem value={link.id} key={link.id}>
                      <Checkbox checked={values.linkIds.includes(link.id)} />
                      {link.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.linkIds && errors.linkIds && (
                  <FormHelperText>{errors.linkIds}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={touched.userIds && errors.userIds ? true : false}
              >
                <InputLabel id={`userIds`}>Users</InputLabel>
                <Select
                  fullWidth
                  multiple
                  labelId={`userIds`}
                  label="Users"
                  value={values.userIds}
                  renderValue={(selectedValues) =>
                    selectedValues
                      .map(
                        (selectedValue) =>
                          users.find((user) => user.id === selectedValue)
                            ?.email || ""
                      )
                      .join(", ")
                  }
                  input={<OutlinedInput label="Users" />}
                  onChange={(event) => {
                    setTouched({
                      userIds: true,
                      ...touched,
                    });
                    setFieldValue("userIds", event.target.value);
                  }}
                >
                  {users.map((user) => (
                    <MenuItem value={user.id} key={user.id}>
                      <Checkbox checked={values.userIds.includes(user.id)} />
                      {user.email}
                    </MenuItem>
                  ))}
                </Select>
                {touched.userIds && errors.userIds && (
                  <FormHelperText>{errors.userIds}</FormHelperText>
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
              <Button onClick={() => handleShare(values, true, resetForm)}>
                Yes
              </Button>
              <Button
                onClick={() => handleShare(values, false, resetForm)}
                autoFocus
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Formik>
  );
};

export default React.memo(TestFormComponent);
