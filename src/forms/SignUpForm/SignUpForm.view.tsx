import { Button, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { JSX } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import InputPassword from "../../components/InputPassword";
import InputText from "../../components/InputText";
import { useSignUpMutation } from "../../slices/authApiSlice";

type Form = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpFormComponent = (): JSX.Element => {
  const navigate = useNavigate();

  const [signUp] = useSignUpMutation();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters."),
    confirmPassword: Yup.string()
      .required("Confirm password is required.")
      .oneOf([Yup.ref("password")], "Password and confirm password must match.")
      .min(6, "Confirm password must be at least 6 characters."),
  });

  const handleSubmit = async (values: Form) => {
    try {
      await signUp({
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
          <Typography>Sign Up</Typography>
          <InputText
            label="Email"
            text={values.email}
            setText={(text) => {
              setTouched({ email: true, ...touched });
              setFieldValue("email", text);
            }}
            error={touched.email ? errors.email : ""}
          />
          <InputPassword
            label="Password"
            text={values.password}
            setText={(text) => {
              setTouched({ password: true, ...touched });
              setFieldValue("password", text);
            }}
            error={touched.password ? errors.password : ""}
          />
          <InputPassword
            label="Confirm Password"
            text={values.confirmPassword}
            setText={(text) => {
              setTouched({ confirmPassword: true, ...touched });
              setFieldValue("confirmPassword", text);
            }}
            error={touched.confirmPassword ? errors.confirmPassword : ""}
          />
          <Button onClick={() => handleSubmit()} variant="contained">
            Sign Up
          </Button>
        </Stack>
      )}
    </Formik>
  );
};

export default React.memo(SignUpFormComponent);
