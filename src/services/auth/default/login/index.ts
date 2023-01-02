import { IToken } from "types";

export const API_LOGIN = "auth/login";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  email: string;
  token: IToken;
}
