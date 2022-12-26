import { startAuthentication } from "@simplewebauthn/browser";
import { AuthenticationCredentialJSON } from "@simplewebauthn/typescript-types";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPasskeyLoginOptions,
  verifyPasskeyLoginOptions,
} from "../../services/auth/passkeys/login";
import useAuth from "../useAuth";
import useWebAuthn from "../useWebAuthn";

const usePasskeyLogin = () => {
  const { token, updateToken, updateEmail } = useAuth();
  const { hasWebAuthnAutofill } = useWebAuthn();
  const navigate = useNavigate();

  const loginPasskey = useCallback(
    async (email: string) => {
      const loginOptions = await getPasskeyLoginOptions(token, email);
      console.log("login options: ", loginOptions);

      const userLoginResult = await startAuthentication(
        loginOptions.data,
        hasWebAuthnAutofill
      );

      console.log("user login result: ", userLoginResult);

      const serverLoginResult = await verifyPasskeyLoginOptions({
        email,
        credential: userLoginResult,
        token,
      });
      console.log("server login result: ", serverLoginResult.data);
      updateEmail(serverLoginResult.data.email);
      updateToken(serverLoginResult.data.token.Authorization);
      navigate("/");
    },
    [token, hasWebAuthnAutofill]
  );

  return { loginPasskey };
};

export default usePasskeyLogin;
