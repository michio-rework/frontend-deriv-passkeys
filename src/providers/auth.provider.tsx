import { ReactNode, useCallback, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import AuthContext, { IAuthContext } from "contexts/auth.context";

interface IAuthProvider {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProvider) => {
  const [tokenStorage, setTokenStorage] = useLocalStorage<string>("token", "");
  const [emailStorage, setEmailStorage] = useLocalStorage<string>("email", "");

  const updateEmail = useCallback((updatedEmail: string) => {
    setEmailStorage(updatedEmail);
  }, []);

  const updateToken = useCallback((updatedToken: string) => {
    setTokenStorage(updatedToken);
  }, []);

  const logout = useCallback(() => {
    setEmailStorage("");
    setTokenStorage("");
  }, []);

  const ContextValue: IAuthContext = useMemo(() => {
    return {
      email: emailStorage,
      token: tokenStorage,
      updateEmail,
      updateToken,
      logout,
    };
  }, [updateEmail, updateToken, tokenStorage]);

  return (
    <AuthContext.Provider value={ContextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
