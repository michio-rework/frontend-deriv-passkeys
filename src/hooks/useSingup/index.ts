import useAxios from 'axios-hooks';
import useAuth from 'hooks/useAuth';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_SIGNUP, ISignUpRequest, ISignUpResponse } from 'services/auth/default/signup';

const useSignup = () => {
  const { updateToken, updateEmail } = useAuth();
  const navigate = useNavigate();

  const [signupResponse, signUp, cancelSignUp] = useAxios<ISignUpResponse, ISignUpRequest>(
    {
      url: API_SIGNUP,
      method: 'post',
    },
    { manual: true },
  );

  const onSignup = useCallback(
    async (data: ISignUpRequest) => {
      try {
        await signUp({ data });
      } catch (error) {
        console.error('Something went wrong: ', error);
      }
    },
    [signUp],
  );

  useEffect(() => {
    if (signupResponse.data?.token) {
      updateEmail(signupResponse.data.email);
      updateToken(signupResponse.data.token.Authorization);
      navigate('/');
    }

    return () => {
      cancelSignUp();
    };
  }, [cancelSignUp, navigate, signupResponse?.data?.email, signupResponse?.data?.token, updateEmail, updateToken]);

  return onSignup;
};

export default useSignup;
