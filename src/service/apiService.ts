const BASE_URL = "http://localhost:8080/api";

interface RequestOptions extends RequestInit {
  body?: BodyInit | null;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

const apiService = {
  get: async <T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      ...options,
    });
    return handleResponse<T>(response);
  },

  post: async <T, B>(
    endpoint: string,
    body: B,
    options?: RequestOptions,
    useJson: boolean = true
  ): Promise<ApiResponse<T>> => {
    const headers: HeadersInit = useJson
      ? { "Content-Type": "application/json" }
      : {};
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: useJson ? JSON.stringify(body) : (body as unknown as BodyInit),
      ...options,
    });
    return handleResponse<T>(response);
  },

  put: async <T, B>(
    endpoint: string,
    body: B,
    options?: RequestOptions,
    useJson: boolean = true
  ): Promise<ApiResponse<T>> => {
    const headers: HeadersInit = useJson
      ? { "Content-Type": "application/json" }
      : {};
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: useJson ? JSON.stringify(body) : (body as unknown as BodyInit),
      ...options,
    });
    return handleResponse<T>(response);
  },
};

const handleResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  const status = response.status;
  if (!response.ok) {
    const errorData = await response.json();
    throw { status, message: errorData.message, error: errorData.error };
  }
  const data = await response.json();
  return { data, status };
};

export default apiService;
