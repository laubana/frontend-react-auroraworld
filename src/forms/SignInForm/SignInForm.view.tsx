import { Button, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { JSX } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import InputPassword from "../../components/InputPassword";
import InputText from "../../components/InputText";
import { store } from "../../configs/storeConfig";
import { useSignInMutation } from "../../slices/authApiSlice";
import { setAuth } from "../../slices/authSlice";

type Form = {
  email: string;
  password: string;
};

const SignInFormComponent = (): JSX.Element => {
  const navigate = useNavigate();

  const [signIn] = useSignInMutation();

  const dispatch = useDispatch<typeof store.dispatch>();

  const initialValues: Form = {
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
      const response = await signIn({
        email: values.email,
        password: values.password,
      }).unwrap();

      dispatch(setAuth(response.data));

      toast.success(response.message);

      navigate("/");
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
          <InputPassword
            label="Password"
            text={values.password}
            setText={(text) => {
              setTouched({ password: true, ...touched });
              setFieldValue("password", text);
            }}
            error={touched.password ? errors.password : ""}
          />
          <>
            <Button onClick={() => handleSubmit()} variant="contained">
              Sign In
            </Button>
            <Typography align="center">
              Don't have an account? Sign up{" "}
              <Link to="/auth/sign-up" replace>
                here
              </Link>
            </Typography>
          </>
        </Stack>
      )}
    </Formik>
  );
};

export default React.memo(SignInFormComponent);
