import {
  ApiConfig,
  ApiResponse,
  api,
  handleApiError,
} from "../../../helpers/axios";
import { getCookie } from "@/helpers/cookie";
import { AUTH_TOKEN } from "@/constants/cookies";
import { EventDto, UserDto } from "./event.types";

const config: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
};

const token = getCookie(AUTH_TOKEN) || "";

export class EventService {
  async createEvent(payload: EventDto, tokenFromState?: string) {
    try {
      const response: ApiResponse<EventDto> = await api(
        tokenFromState || token,
        config,
        "post",
        `/events`,
        payload
      );

      return response.data;
    } catch (error) {
      throw new Error(
        handleApiError(error, "Erro ao criar evento.")
      );
    }
  }

  async deleteEvent(id: EventDto['id'], tokenFromState?: string) {
    try {
      const response: ApiResponse<undefined> = await api(
        tokenFromState || token,
        config,
        "delete",
        `/events/${id}`,
      );

      return response.data;
    } catch (error) {
      throw new Error(
        handleApiError(error, "Erro ao deletar evento.")
      );
    }
  }

  async getAllEvents(tokenFromState?: string) {
    try {
      const response: ApiResponse<EventDto[]> = await api(
        tokenFromState || token,
        config,
        "get",
        `/events`
      );

      return response.data;
    } catch (error) {
      throw new Error(
        handleApiError(error, "Erro ao listar eventos.")
      );
    }
  }

  async createOrUpdateUser(payload: UserDto, tokenFromState?: string) {
    try {
      const response: ApiResponse<UserDto> = await api(
        tokenFromState || token,
        config,
        "post",
        `/users/create`,
        payload
      );

      return response.data;
    } catch (error) {
      throw new Error(
        handleApiError(error, "Erro ao criar usuário.")
      );
    }
  }

  async deleteUser(id: UserDto['id'], tokenFromState?: string) {
    try {
      const response: ApiResponse<undefined> = await api(
        tokenFromState || token,
        config,
        "delete",
        `/users/${id}`,
      );

      return response.data;
    } catch (error) {
      throw new Error(
        handleApiError(error, "Erro ao deletar usuário.")
      );
    }
  }
}
