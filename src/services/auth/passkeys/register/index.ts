import {
  PublicKeyCredentialCreationOptionsJSON,
  RegistrationCredentialJSON,
} from "@simplewebauthn/typescript-types";
import axios from "axios";

export const getPasskeyRegisterationOptions = (token: string) => {
  return axios.get<PublicKeyCredentialCreationOptionsJSON>(
    "http://localhost:3000/auth/passkeys/register",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const verifyPasskeyRegisterationOptions = (
  token: string,
  userRegistrationResult: RegistrationCredentialJSON
) => {
  return axios.post<{ verified: boolean }>(
    "http://localhost:3000/auth/passkeys/register",
    { credential: userRegistrationResult },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
