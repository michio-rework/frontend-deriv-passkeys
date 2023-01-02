import { startAuthentication } from '@simplewebauthn/browser';
import { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/typescript-types';
import useAxios from 'axios-hooks';
import useAuth from 'hooks/useAuth';
import useWebAuthn from 'hooks/useWebAuthn';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  API_LOGIN_PASSKEY,
  API_LOGIN_PASSKEY_OPTIONS,
  IGetPasskeyLoginOptionsRequest,
  IVerifyPasskeyLoginOptionsRequest,
  IVerifyPasskeyLoginResponse,
} from 'services/auth/passkeys/login';

const usePasskeyLogin = () => {
  const { updateToken, updateEmail } = useAuth();
  const { hasWebAuthnAutofill } = useWebAuthn();
  const navigate = useNavigate();

  const [, getPasskeyOptions, cancelGetPasskeyOptions] = useAxios<
    PublicKeyCredentialCreationOptionsJSON,
    IGetPasskeyLoginOptionsRequest
  >(
    {
      url: API_LOGIN_PASSKEY_OPTIONS,
      method: 'post',
    },
    { manual: true },
  );

  const [, verifyLogin, cancelVerifyLogin] = useAxios<IVerifyPasskeyLoginResponse, IVerifyPasskeyLoginOptionsRequest>(
    {
      url: API_LOGIN_PASSKEY,
      method: 'post',
    },
    { manual: true },
  );

  const loginPasskey = useCallback(
    async (email: string) => {
      try {
        const options = await getPasskeyOptions({ data: { email } });

        const userLoginResult = await startAuthentication(options.data, hasWebAuthnAutofill);

        const verifyReqData = {
          email,
          credential: userLoginResult,
        };

        const verification = await verifyLogin({
          data: verifyReqData,
        });

        if (verification.data.verified) {
          updateEmail(verification.data.email);
          updateToken(verification.data.token.Authorization);
          navigate('/');
        }
      } catch (error) {
        console.error('Something went wrong: ', error);
      }
    },
    [getPasskeyOptions, hasWebAuthnAutofill, navigate, updateEmail, updateToken, verifyLogin],
  );

  useEffect(() => {
    return () => {
      cancelGetPasskeyOptions();
      cancelVerifyLogin();
    };
  }, [cancelGetPasskeyOptions, cancelVerifyLogin]);

  return { loginPasskey };
};

export default usePasskeyLogin;
