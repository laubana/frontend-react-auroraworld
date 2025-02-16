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
import * as Yup from "yup";

import { LinkFormProps } from "./LinkForm.props";

import InputText from "../../components/InputText";
import {
  useAddLinkMutation,
  useUpdateLinkMutation,
} from "../../slices/linkApiSlice";

type Form = {
  category: string;
  name: string;
  url: string;
};

const LinkFormComponent = (props: LinkFormProps): JSX.Element => {
  const {
    mode = "create",
    linkId,
    category,
    categories = [],
    name,
    url,
  } = props;

  const [addLink] = useAddLinkMutation();
  const [updateLink] = useUpdateLinkMutation();

  const initialValues = {
    category: mode === "create" ? "" : category || "",
    name: mode === "create" ? "" : name || "",
    url: mode === "create" ? "" : url || "",
  };

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Category is required."),
    name: Yup.string().required("Name is required."),
    url: Yup.string().required("Url is required."),
  });

  const handleSubmit = async (
    values: Form,
    formikHelpers: FormikHelpers<Form>
  ) => {
    try {
      if (mode === "create") {
        await addLink({
          categoryId: values.category,
          name: values.name,
          url: values.url,
        }).unwrap();

        formikHelpers.resetForm();
      } else {
        if (linkId) {
          await updateLink({
            linkId,
            categoryId: values.category,
            name: values.name,
            url: values.url,
          }).unwrap();
        }
      }
    } catch (error) {
      console.error(error);
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
          <Typography alignSelf="start">Add Link</Typography>
          <Stack
            spacing={4}
            direction={{ xs: "column", sm: "row" }}
            alignSelf="stretch"
          >
            <FormControl fullWidth error={errors.category ? true : false}>
              <InputLabel id={`categories-${linkId}`}>Category</InputLabel>
              <Select
                fullWidth
                labelId={`categories-${linkId}`}
                label="Categories"
                value={values.category}
                onChange={(event) => {
                  setTouched({ category: true, ...touched });
                  setFieldValue("category", event.target.value);
                }}
              >
                {categories.map((category) => (
                  <MenuItem value={category.id} key={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {touched.category && (
                <FormHelperText>{errors.category}</FormHelperText>
              )}
            </FormControl>
            <InputText
              label="Category"
              text={values.category}
              setText={(category) => {
                setTouched({ category: true, ...touched });
                setFieldValue("category", category);
              }}
              error={touched.category ? errors.category : ""}
            />
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
