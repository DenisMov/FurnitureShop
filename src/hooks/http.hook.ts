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
  const request = async <T = any>({
    url,
    method = "GET",
    body = null,
    headers = { "Content-Type": "application/json" },
  }: IRequestConfig): Promise<T> => {
    try {
      const config: RequestInit = {
        method,
        headers: new Headers(headers),
      };

      if (body) {
        config.body = typeof body === "string" ? body : JSON.stringify(body);
        if (!(headers && headers["Content-Type"])) {
          headers["Content-Type"] = "application/json";
        }
      }

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      const data: T = await response.json();
      return data;
    } catch (e) {
      console.error("HTTP Request Error:", e);
      throw e;
    }
  };

  return { request };
};
