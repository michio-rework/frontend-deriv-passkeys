import { ReactNode, useCallback, useMemo, useState } from "react";
import AuthContext, { IAuthContext } from "../contexts/auth.context";

interface IAuthProvider {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProvider) => {
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const updateEmail = useCallback((updatedEmail: string) => {
    // todo: add email validation
    setEmail(updatedEmail);
  }, []);

  const updateToken = useCallback((updatedToken: string) => {
    setToken(updatedToken);
  }, []);

  const ContextValue: IAuthContext = useMemo(() => {
    return {
      email,
      token,
      updateEmail,
      updateToken,
    };
  }, [email, token, updateEmail, updateToken]);

  return (
    <AuthContext.Provider value={ContextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
