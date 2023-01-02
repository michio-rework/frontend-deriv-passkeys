import { startRegistration } from '@simplewebauthn/browser';
import { PublicKeyCredentialCreationOptionsJSON, RegistrationCredentialJSON } from '@simplewebauthn/typescript-types';
import useAxios from 'axios-hooks';
import { useCallback, useEffect, useState } from 'react';
import {
  API_PASSKEY_REGISTER,
  API_PASSKEY_REGISTER_OPTIONS,
  IVerificationResponse,
} from 'services/auth/passkeys/register';

const usePasskeyRegister = () => {
  const [registerVerified, setRegisterVerified] = useState<boolean>(false);

  const [passkeyRegisterOptions, getPasskeyOptions, cancelGetPasskeyOptions] =
    useAxios<PublicKeyCredentialCreationOptionsJSON>(
      {
        url: API_PASSKEY_REGISTER_OPTIONS,
        method: 'get',
      },
      { manual: true },
    );

  const [passkeyLoginVerification, verifyLogin, cancelVerifyLogin] = useAxios<
    IVerificationResponse,
    RegistrationCredentialJSON
  >(
    {
      url: API_PASSKEY_REGISTER,
      method: 'post',
    },
    { manual: true },
  );

  const registerPasskey = useCallback(async () => {
    try {
      await getPasskeyOptions();
      if (passkeyRegisterOptions.data) {
        const userRegistrationResult: RegistrationCredentialJSON = await startRegistration(passkeyRegisterOptions.data);
        await verifyLogin({ data: userRegistrationResult });
      }
    } catch (error) {
      console.error('Something went wrong: ', error);
    }
  }, [getPasskeyOptions, passkeyRegisterOptions.data, verifyLogin]);

  useEffect(() => {
    if (passkeyLoginVerification.data?.verified) {
      setRegisterVerified(passkeyLoginVerification.data.verified);
    }

    return () => {
      cancelGetPasskeyOptions();
      cancelVerifyLogin();
    };
  }, [cancelGetPasskeyOptions, cancelVerifyLogin, passkeyLoginVerification?.data?.verified]);

  return { registerVerified, registerPasskey };
};

export default usePasskeyRegister;
