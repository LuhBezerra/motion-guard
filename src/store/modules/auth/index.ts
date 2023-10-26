import { createSlice } from "@reduxjs/toolkit";
import { login } from "./actions";
import { AuthResponse } from "@/store/services/auth/auth.types";
import { setFulfilledThunkActionStatus, setThunkActionStatus } from "@/hooks/useThunkFetchCall";
import { getCookie } from "@/helpers/cookie";

interface AuthState {
  token?: AuthResponse["token"];
}

const initialState: AuthState = {
  token: getCookie("AUTH_TOKEN")
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addAuthToken: (state, action) => {
      state.token = action.payload
    }
  },
  extraReducers: (builder) => {
    setThunkActionStatus(builder, login);
    builder.addCase(login.fulfilled, (state, action) => {
      setFulfilledThunkActionStatus(state, login);

      state.token = action.payload.token;
    })
  }
})

const {reducer: authReducer, actions: authActions} = authSlice

export {authReducer, authActions}