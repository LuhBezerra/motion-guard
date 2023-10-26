import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ApiError } from "./types";

export interface ApiConfig {
  baseURL: string;
  headers?: object;
}

type ApiMethod = "get" | "post" | "put" | "delete";

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: object;
  config: AxiosRequestConfig;
  request?: any;
}

export const api = async <T>(
  token: string,
  config: ApiConfig,
  method: ApiMethod,
  url: string,
  data?: any,
  contentType: string = "application/json"
): Promise<ApiResponse<T>> => {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: config.baseURL,
    headers: {
      ...config.headers,
      "Content-Type": contentType,
    },
    method: method,
    url: url,
    data: data,
  };

    // Se um token for fornecido, adicione o cabeçalho de autorização
    // if (token) {
    //   axiosConfig.headers!.Authorization = `Bearer ${token}`;
    // }

  try {
    const response = await axios(axiosConfig);
    const apiResponse: ApiResponse<T> = {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config: response.config,
      request: response.request,
    };
    return apiResponse;
  } catch (error) {
    return await Promise.reject(error);
  }
};

export const handleApiError = (error: unknown, defaultError: string) => {
  const axiosError = error as AxiosError;

  const message = (axiosError?.response?.data as ApiError)?.message;
  // no java quando retorna uma message com contrabarra significa que é uma mensagem interna ou que nao foi tratada
  const isInternalMessage = message?.includes("/");

  if (isInternalMessage || !message) {
    return defaultError;
  }

  return message;
};
