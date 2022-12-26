import axios from "axios";
import { IToken } from "../../../../types";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  email: string;
  token: IToken;
}

const login = ({ email, password }: ILoginRequest) => {
  return axios.post<ILoginResponse>("http://localhost:3000/auth/login", {
    email,
    password,
  });
};

export default login;
