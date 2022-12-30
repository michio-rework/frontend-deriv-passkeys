import {
  AuthenticationCredentialJSON,
  PublicKeyCredentialCreationOptionsJSON,
} from "@simplewebauthn/typescript-types";
import { IToken } from "types";
import Api from "services/api";

export interface IVerifyPasskeyLoginResponse {
  email: string;
  token: IToken;
  verified: boolean;
}

export const getPasskeyLoginOptions = (token: string, email: string) => {
  return Api.post<PublicKeyCredentialCreationOptionsJSON>(
    "passkeys/login/options",
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
  return Api.post<IVerifyPasskeyLoginResponse>(
    "passkeys/login",
    { email, credential },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
