import { startAuthentication } from "@simplewebauthn/browser";
import useAuth from "hooks/useAuth";
import useWebAuthn from "hooks/useWebAuthn";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPasskeyLoginOptions,
  verifyPasskeyLoginOptions,
} from "services/auth/passkeys/login";

const usePasskeyLogin = () => {
  const { token, updateToken, updateEmail } = useAuth();
  const { hasWebAuthnAutofill } = useWebAuthn();
  const navigate = useNavigate();

  const loginPasskey = useCallback(
    async (email: string) => {
      const loginOptions = await getPasskeyLoginOptions(token, email);

      const userLoginResult = await startAuthentication(
        loginOptions.data,
        hasWebAuthnAutofill
      );

      const serverLoginResult = await verifyPasskeyLoginOptions({
        email,
        credential: userLoginResult,
        token,
      });
      updateEmail(serverLoginResult.data.email);
      updateToken(serverLoginResult.data.token.Authorization);
      navigate("/");
    },
    [token, hasWebAuthnAutofill]
  );

  return { loginPasskey };
};

export default usePasskeyLogin;
