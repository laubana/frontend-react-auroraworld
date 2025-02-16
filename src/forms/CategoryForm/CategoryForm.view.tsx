import { Button, Stack, Typography } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import React, { JSX } from "react";
import * as Yup from "yup";

import InputText from "../../components/InputText";
import { useAddCategoryMutation } from "../../slices/categoryApiSlice";

type Form = {
  name: string;
};

const CategoryFormComponent = (): JSX.Element => {
  const [addCategory] = useAddCategoryMutation();

  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
  });

  const handleSubmit = async (
    values: Form,
    formikHelpers: FormikHelpers<Form>
  ) => {
    try {
      await addCategory({
        name: values.name,
      }).unwrap();

      formikHelpers.resetForm();
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
          <Typography alignSelf="start">Add Category</Typography>
          <Stack
            spacing={4}
            direction={{ xs: "column", sm: "row" }}
            alignSelf="stretch"
          >
            <InputText
              label="Name"
              text={values.name}
              setText={(name) => {
                setTouched({ name: true, ...touched });
                setFieldValue("name", name);
              }}
              error={touched.name ? errors.name : ""}
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

export default React.memo(CategoryFormComponent);
