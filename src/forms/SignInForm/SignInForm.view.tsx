import { Button, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { JSX } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import InputText from "../../components/InputText";
import { useSignInMutation } from "../../slices/authApiSlice";

type Form = {
  email: string;
  password: string;
};

const SignInFormComponent = (): JSX.Element => {
  const navigate = useNavigate();

  const [signIn] = useSignInMutation();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters."),
  });

  const handleSubmit = async (values: Form) => {
    try {
      await signIn({
        email: values.email,
        password: values.password,
      }).unwrap();

      navigate("/auth/sign-in");
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
        <Stack spacing={4}>
          <Typography>Sign In</Typography>
          <InputText
            label="Email"
            text={values.email}
            setText={(text) => {
              setTouched({ email: true, ...touched });
              setFieldValue("email", text);
            }}
            error={touched.email ? errors.email : ""}
          />
          <InputText
            label="Password"
            text={values.password}
            setText={(text) => {
              setTouched({ password: true, ...touched });
              setFieldValue("password", text);
            }}
            error={touched.password ? errors.password : ""}
          />
          <Button onClick={() => handleSubmit()} variant="contained">
            Sign In
          </Button>
        </Stack>
      )}
    </Formik>
  );
};

export default React.memo(SignInFormComponent);
