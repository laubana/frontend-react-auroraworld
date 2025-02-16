import { JSX } from "react";

import SignInView from "./SignIn.view";

const SignIn = (): JSX.Element => {
  const props = {};

  console.log(true);

  return <SignInView {...props} />;
};

export default SignIn;
