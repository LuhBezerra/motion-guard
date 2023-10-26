import { ApiConfig, ApiResponse, api, handleApiError } from "../../../helpers/axios";
import { AuthPayload, AuthResponse } from "./auth.types";

const config: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
};

export class AuthService {
  async login(payload: AuthPayload) {
    try {
      const response: ApiResponse<AuthResponse> = await api(
        "",
        config,
        "post",
        `/auth`,
        payload
      );

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error, "Erro ao tentar fazer login."));
    }
  }
}
