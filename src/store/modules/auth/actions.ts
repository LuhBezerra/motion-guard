import { RootState, ThunkApiType } from "@/store";
import { AuthService } from "@/store/services/auth";
import { AuthPayload, AuthResponse } from "@/store/services/auth/auth.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie } from "@/helpers/cookie";
import { AUTH_TOKEN } from "@/constants/cookies";

export const AuthActions = {
  LOGIN: "login",
};

export const login = createAsyncThunk<
  AuthResponse,
  { payload: AuthPayload },
  ThunkApiType<RootState>
>(AuthActions.LOGIN, async ({ payload }, { getState, rejectWithValue }) => {
  try {
    const response = await new AuthService().login(payload);

    setCookie(AUTH_TOKEN, response.token);

    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});
