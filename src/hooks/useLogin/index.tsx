import useAxios from 'axios-hooks';
import useAuth from 'hooks/useAuth';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_LOGIN, ILoginRequest, ILoginResponse } from 'services/auth/default/login';

const useLogin = () => {
  const { updateToken, updateEmail } = useAuth();
  const navigate = useNavigate();

  const [loginResponse, execute, cancel] = useAxios<ILoginResponse, ILoginRequest>(
    {
      url: API_LOGIN,
      method: 'post',
    },
    { manual: true },
  );

  const onLogin = useCallback(
    async (request: ILoginRequest) => {
      try {
        await execute({ data: request });
      } catch (error) {
        console.error('Something went wrong: ', error);
      }
    },
    [execute],
  );
  useEffect(() => {
    if (loginResponse?.data?.token) {
      updateEmail(loginResponse?.data?.email);
      updateToken(loginResponse?.data?.token.Authorization);
      navigate('/');
    }

    return () => {
      cancel();
    };
  }, [cancel, loginResponse?.data?.email, loginResponse?.data?.token, navigate, updateEmail, updateToken]);

  return { onLogin, loading: loginResponse.loading, error: loginResponse.error };
};

export default useLogin;
