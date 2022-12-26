import axios from "axios";
import { IToken } from "../../../../types";

export interface ISignUpRequest {
  email: string;
  password: string;
}

export interface ISignUpResponse {
  email: string;
  token: IToken;
}

const signup = ({ email, password }: ISignUpRequest) => {
  return axios.post<ISignUpResponse>("http://localhost:3000/auth/register", {
    email,
    password,
  });
};

export default signup;
