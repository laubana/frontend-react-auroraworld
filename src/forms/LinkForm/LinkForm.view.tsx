import { Button, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { JSX } from "react";
import * as Yup from "yup";

import InputText from "../../components/InputText";
import { useAddLinkMutation } from "../../slices/linkApiSlice";

type Form = {
  category: string;
  name: string;
  url: string;
};

const LinkFormComponent = (): JSX.Element => {
  const [addLink] = useAddLinkMutation();

  const initialValues = {
    category: "",
    name: "",
    url: "",
  };

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Category is required."),
    name: Yup.string().required("Name is required."),
    url: Yup.string().required("Url is required."),
  });

  const handleSubmit = async (values: Form) => {
    try {
      await addLink({
        category: values.category,
        name: values.name,
        url: values.url,
      }).unwrap();
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
          <Button onClick={() => handleSubmit()} variant="contained">
            Add
          </Button>
        </Stack>
      )}
    </Formik>
  );
};

export default React.memo(LinkFormComponent);
