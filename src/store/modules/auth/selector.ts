import { RootState } from "@/store";

export const getAuthTokenSelector = (state: RootState) => state.auth.token;