export const API_USER_ME = 'users/me';

export interface IAuthenticator {
  id: number;
  userId: number;
  counter: number;
  credentialID: string;
  credentialPublicKey: string;
  credentialDeviceType: string;
  transports: string[];
}
export interface IGetUserResponse {
  email: string;
  authenticators?: IAuthenticator[];
}
