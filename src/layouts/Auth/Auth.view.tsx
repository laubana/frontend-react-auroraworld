import React, { JSX, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { store } from "../../configs/storeConfig";
import { useRefreshMutation } from "../../slices/authApiSlice";
import { selectAccessToken, setAuth } from "../../slices/authSlice";

const AuthComponent = (): JSX.Element => {
  const [refresh] = useRefreshMutation();
  const dispatch = useDispatch<typeof store.dispatch>();

  const accessToken = useSelector(selectAccessToken);
  const [isRefreshed, setIsRefreshed] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const main = async () => {
      try {
        const response = await refresh().unwrap();

        dispatch(setAuth(response.data));
      } finally {
        setIsRefreshed(true);
      }
    };

    if (accessToken) {
      setIsRefreshed(true);
    } else {
      main();
    }
  }, [accessToken, dispatch, refresh]);

  return <>{isRefreshed && <Outlet />}</>;
};

export default React.memo(AuthComponent);
