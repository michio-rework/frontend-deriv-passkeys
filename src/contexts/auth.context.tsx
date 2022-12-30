import { createContext } from "react";

export interface IAuthContext {
  email: string;
  token: string;
  updateEmail: (newEmail: string) => void;
  updateToken: (newToken: string) => void;
  logout: () => void;
}

const ContextInitialValue: IAuthContext = {
  email: "",
  token: "",
} as IAuthContext;

const AuthContext = createContext<IAuthContext>(ContextInitialValue);

export default AuthContext;
