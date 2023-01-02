import Api from "services/api";
import { IToken } from "types";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  email: string;
  token: IToken;
}

const login = ({ email, password }: ILoginRequest) => {
  return Api.post<ILoginResponse>("auth/login/", {
    email,
    password,
  });
};

export default login;
