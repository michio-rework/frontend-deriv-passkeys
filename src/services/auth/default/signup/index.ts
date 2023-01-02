import { IToken } from 'types';

export const API_SIGNUP = 'auth/register';

export interface ISignUpRequest {
  email: string;
  password: string;
}

export interface ISignUpResponse {
  email: string;
  token: IToken;
}
