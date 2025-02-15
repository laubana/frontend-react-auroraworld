import React, { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { selectAccessToken } from "../../slices/authSlice";

const ProtectComponent = (): JSX.Element => {
  const location = useLocation();

  const accessToken = useSelector(selectAccessToken);

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/sign-in" state={{ from: location }} replace />
  );
};

export default React.memo(ProtectComponent);
