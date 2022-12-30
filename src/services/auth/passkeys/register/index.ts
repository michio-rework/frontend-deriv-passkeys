import {
  PublicKeyCredentialCreationOptionsJSON,
  RegistrationCredentialJSON,
} from "@simplewebauthn/typescript-types";
import Api from "services/api";

export const getPasskeyRegisterationOptions = (token: string) => {
  return Api.get<PublicKeyCredentialCreationOptionsJSON>(
    "passkeys/register/options",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const verifyPasskeyRegisterationOptions = (
  token: string,
  userRegistrationResult: RegistrationCredentialJSON
) => {
  return Api.post<{ verified: boolean }>(
    "passkeys/register",
    { credential: userRegistrationResult },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
