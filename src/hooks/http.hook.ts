type HTTPRequestMethods = "GET" | "POST" | "PATCH" | "DELETE";

interface HTTPHeaders {
  [key: string]: string;
}

interface IRequestConfig {
  url: string;
  method?: HTTPRequestMethods;
  body?: any;
  headers?: HTTPHeaders;
}

export const useHttp = () => {
  const request = async ({
    url,
    method = "GET",
    body = null,
    headers = { "Content-Type": "application/json" },
  }: IRequestConfig) => {
    try {
      const config: RequestInit = {
        method,
        headers,
      };

      if (body) {
        config.body = typeof body === "string" ? body : JSON.stringify(body);
      }

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (e) {
      throw e;
    }
  };

  return { request };
};
