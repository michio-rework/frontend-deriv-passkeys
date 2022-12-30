import { startRegistration } from "@simplewebauthn/browser";
import { RegistrationCredentialJSON } from "@simplewebauthn/typescript-types";
import useAuth from "hooks/useAuth";
import { useCallback, useState } from "react";
import {
  getPasskeyRegisterationOptions,
  verifyPasskeyRegisterationOptions,
} from "services/auth/passkeys/register";

const usePasskeyRegister = () => {
  const { token } = useAuth();
  const [registerVerified, setRegisterVerified] = useState<boolean>(false);

  const registerPasskey = useCallback(async () => {
    // Get registeration options from server
    const userRegisterationOptions = await getPasskeyRegisterationOptions(
      token
    );

    // Get User's Credentials
    const userRegistrationResult: RegistrationCredentialJSON =
      await startRegistration(userRegisterationOptions.data);

    // Get Server's Verification
    const serverVerificationResult = await verifyPasskeyRegisterationOptions(
      token,
      userRegistrationResult
    );

    setRegisterVerified(serverVerificationResult.data.verified);
  }, [token]);

  return { registerVerified, registerPasskey };
};

export default usePasskeyRegister;
