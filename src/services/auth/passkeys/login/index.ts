import { AuthenticationCredentialJSON, PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/typescript-types';
import { IToken } from 'types';
import Api from 'services/api';

export interface IVerifyPasskeyLoginResponse {
  email: string;
  token: IToken;
  verified: boolean;
}

export interface IGetPasskeyLoginOptionsRequest {
  email: string;
}

export interface IVerifyPasskeyLoginOptionsRequest {
  email: string;
  credential: AuthenticationCredentialJSON;
}

export const API_LOGIN_PASSKEY_OPTIONS = 'passkeys/login/options';
export const API_LOGIN_PASSKEY = 'passkeys/login';
