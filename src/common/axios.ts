import axios from "axios";

declare module "axios" {
  export interface AxiosResponse<T = any> extends Promise<T> {
    message: string;
    data: T;
  }
}

const getBaseUrl = () => process.env.API_URL ?? "http://localhost:8080";

const instance = axios.create({
  baseURL: getBaseUrl(),
});

instance.interceptors.response.use((response) => response.data);

export default instance;
