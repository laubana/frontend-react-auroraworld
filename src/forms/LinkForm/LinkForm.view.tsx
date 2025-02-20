import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import React, { JSX } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { LinkFormProps } from "./LinkForm.props";

import InputText from "../../components/InputText";
import {
  useAddLinkMutation,
  useUpdateLinkMutation,
} from "../../slices/linkApiSlice";

type Form = {
  categoryId: string;
  name: string;
  url: string;
};

const LinkFormComponent = (props: LinkFormProps): JSX.Element => {
  const {
    mode = "create",
    linkId,
    categories = [],
    categoryId,
    name,
    url,
  } = props;

  const [addLink] = useAddLinkMutation();
  const [updateLink] = useUpdateLinkMutation();

  const initialValues: Form = {
    categoryId: mode === "create" ? "" : categoryId || "",
    name: mode === "create" ? "" : name || "",
    url: mode === "create" ? "" : url || "",
  };

  const validationSchema = Yup.object().shape({
    categoryId: Yup.string().required("Category is required."),
    name: Yup.string().required("Name is required."),
    url: Yup.string().required("Url is required."),
  });

  const handleSubmit = async (
    values: Form,
    formikHelpers: FormikHelpers<Form>
  ) => {
    try {
      if (mode === "create") {
        const response = await addLink({
          categoryId: values.categoryId,
          name: values.name,
          url: values.url,
        }).unwrap();

        formikHelpers.resetForm();

        toast.success(response.message);
      } else {
        if (linkId) {
          const response = await updateLink({
            linkId,
            categoryId: values.categoryId,
            name: values.name,
            url: values.url,
          }).unwrap();

          toast.success(response.message);
        }
      }
    } catch (error) {
      console.error(error);

      toast.error((error as { data: { message: string } }).data.message);
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
        <Stack spacing={4} alignItems={{ xs: "stretch", sm: "center" }}>
          <Typography variant="h3" alignSelf="start">
            {mode === "create" ? "Add Link" : "Update Link"}
          </Typography>
          <Stack
            spacing={4}
            direction={{ xs: "column", sm: "row" }}
            alignSelf="stretch"
          >
            <FormControl
              fullWidth
              error={touched.categoryId && errors.categoryId ? true : false}
            >
              <InputLabel id={`categories-${linkId}`}>Category</InputLabel>
              <Select
                fullWidth
                labelId={`categories-${linkId}`}
                label="Category"
                value={values.categoryId}
                onChange={(event) => {
                  setTouched({ categoryId: true, ...touched });
                  setFieldValue("categoryId", event.target.value);
                }}
              >
                {categories.map((category) => (
                  <MenuItem value={category.id} key={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {touched.categoryId && errors.categoryId && (
                <FormHelperText>{errors.categoryId}</FormHelperText>
              )}
            </FormControl>
            <InputText
              label="Name"
              text={values.name}
              setText={(name) => {
                setTouched({ name: true, ...touched });
                setFieldValue("name", name);
              }}
              error={touched.name ? errors.name : ""}
            />
            <InputText
              label="Url"
              text={values.url}
              setText={(url) => {
                setTouched({ url: true, ...touched });
                setFieldValue("url", url);
              }}
              error={touched.url ? errors.url : ""}
            />
          </Stack>
          {mode === "create" ? (
            <Button onClick={() => handleSubmit()} variant="contained">
              Add
            </Button>
          ) : (
            <Button onClick={() => handleSubmit()} variant="contained">
              Confirm
            </Button>
          )}
        </Stack>
      )}
    </Formik>
  );
};

export default React.memo(LinkFormComponent);
