import Api from "services/api";

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

const getUser = (token: string) => {
  return Api.get<IGetUserResponse>("users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default getUser;
