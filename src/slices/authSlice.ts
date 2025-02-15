import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../configs/storeConfig";

interface StateProps {
  accessToken: string;
  id: string;
  email: string;
}

const initialState: StateProps = {
  accessToken: "",
  id: "",
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { accessToken, email, id } = action.payload;

      state.accessToken = accessToken;
      state.id = id;
      state.email = email;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectId = (state: RootState) => state.auth.id;
export const selectEmail = (state: RootState) => state.auth.email;
