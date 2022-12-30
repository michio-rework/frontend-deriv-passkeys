import useAuth from "hooks/useAuth";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import login, { ILoginRequest } from "services/auth/default/login";

const useLogin = () => {
  const { updateToken, updateEmail } = useAuth();
  const navigate = useNavigate();

  const onLogin = useCallback(
    async ({ email, password }: ILoginRequest) => {
      const loginResult = await login({
        email,
        password,
      });
      updateEmail(loginResult.data.email);
      updateToken(loginResult.data.token.Authorization);
      navigate("/");
    },
    [navigate, updateToken, updateEmail]
  );

  return onLogin;
};

export default useLogin;
