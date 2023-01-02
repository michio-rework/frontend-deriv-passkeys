import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import AuthContext, { IAuthContext } from 'contexts/auth.context';

interface IAuthProvider {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProvider) => {
  const [tokenStorage, setTokenStorage] = useState<string>('');
  const [emailStorage, setEmailStorage] = useState<string>('');

  const updateEmail = useCallback(
    (updatedEmail: string) => {
      localStorage.setItem('email', updatedEmail);
      setEmailStorage(updatedEmail);
    },
    [setEmailStorage],
  );

  const updateToken = useCallback(
    (updatedToken: string) => {
      localStorage.setItem('token', updatedToken);
      setTokenStorage(updatedToken);
    },
    [setTokenStorage],
  );

  const logout = useCallback(() => {
    setEmailStorage('');
    setTokenStorage('');
  }, [setEmailStorage, setTokenStorage]);

  useEffect(() => {
    setTokenStorage(localStorage.getItem('token') ?? '');
    setEmailStorage(localStorage.getItem('email') ?? '');
  }, []);

  const ContextValue: IAuthContext = useMemo(() => {
    return {
      email: emailStorage,
      token: tokenStorage,
      updateEmail,
      updateToken,
      logout,
    };
  }, [emailStorage, logout, tokenStorage, updateEmail, updateToken]);

  return <AuthContext.Provider value={ContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
