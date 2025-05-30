import axios, { AxiosRequestConfig } from "axios";
import CustomApiError from "./cutomApiError";

const BASE_URL = "http://localhost:8080/api";

interface ApiResponse<T> {
  data: {
    datas: T[];
    page?: number;
    per_page?: number;
    total?: number;
    total_pages?: number;
  };
  message?: string;
  status: number;
}
interface ApiResult<T> {
  data: T;
  status: number;
}

const apiServiceAxios = {
  get: async <T>(
    endpoint: string,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, string>,
    options?: AxiosRequestConfig
  ): Promise<ApiResult<ApiResponse<T>>> => {
    try {
      const url = constructUrl(endpoint, pathParams, queryParams);
      const response = await axios.get<ApiResponse<T>>(url, options);
      return { data: response.data, status: response.status };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data;

        throw new CustomApiError(
          apiError?.message || error.message,
          error.response?.status || 500,
          apiError?.success,
          apiError?.error
        );
      }
      throw error;
    }
  },

  post: async <T, B>(
    endpoint: string,
    body: B,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, string>,
    options?: AxiosRequestConfig
  ): Promise<ApiResult<ApiResponse<T>>> => {
    try {
      const url = constructUrl(endpoint, pathParams, queryParams);
      const response = await axios.post<ApiResponse<T>>(url, body, options);
      return { data: response.data, status: response.status };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data;

        throw new CustomApiError(
          apiError?.message || error.message,
          error.response?.status || 500,
          apiError?.success,
          apiError?.error
        );
      }
      throw error;
    }
  },

  put: async <T, B>(
    endpoint: string,
    body?: B,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, string>,
    options?: AxiosRequestConfig
  ): Promise<ApiResult<ApiResponse<T>>> => {
    try {
      const url = constructUrl(endpoint, pathParams, queryParams);
      const response = await axios.put<ApiResponse<T>>(url, body, options);
      return { data: response.data, status: response.status };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data;

        throw new CustomApiError(
          apiError?.message || error.message,
          error.response?.status || 500,
          apiError?.success,
          apiError?.error
        );
      }
      throw error;
    }
  },
};

const constructUrl = (
  endpoint: string,
  pathParams?: Record<string, string>,
  queryParams?: Record<string, string>
): string => {
  let url = `${BASE_URL}${endpoint}`;

  if (pathParams) {
    for (const [key, value] of Object.entries(pathParams)) {
      url = url.replace(`:${key}`, encodeURIComponent(value));
    }
  }

  const queryString = new URLSearchParams(queryParams).toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  return url;
};

export default apiServiceAxios;
