import Api from "services/api";
import { IToken } from "types";

export interface ISignUpRequest {
  email: string;
  password: string;
}

export interface ISignUpResponse {
  email: string;
  token: IToken;
}

const signup = ({ email, password }: ISignUpRequest) => {
  return Api.post<ISignUpResponse>("auth/register", {
    email,
    password,
  });
};

export default signup;
