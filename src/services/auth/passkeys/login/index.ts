import {
  AuthenticationCredentialJSON,
  PublicKeyCredentialCreationOptionsJSON,
} from "@simplewebauthn/typescript-types";
import axios from "axios";
import { IToken } from "../../../../types";

export interface IVerifyPasskeyLoginResponse {
  email: string;
  token: IToken;
  verified: boolean;
}

export const getPasskeyLoginOptions = (token: string, email: string) => {
  return axios.post<PublicKeyCredentialCreationOptionsJSON>(
    "http://localhost:3000/auth/passkeys/login/options",
    {
      email,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const verifyPasskeyLoginOptions = ({
  token,
  credential,
  email,
}: {
  token: string;
  email: string;
  credential: AuthenticationCredentialJSON;
}) => {
  return axios.post<IVerifyPasskeyLoginResponse>(
    "http://localhost:3000/auth/passkeys/login",
    { email, credential },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
