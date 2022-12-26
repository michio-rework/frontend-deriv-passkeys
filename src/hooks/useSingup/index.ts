import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import signup, { ISignUpRequest } from "../../services/auth/default/signup";
import useAuth from "../useAuth";

const useSignup = () => {
  const { updateToken, updateEmail } = useAuth();
  const navigate = useNavigate();

  const onSignup = useCallback(
    async ({ email, password }: ISignUpRequest) => {
      const signupResult = await signup({
        email,
        password,
      });

      updateEmail(signupResult.data.email);
      updateToken(signupResult.data.token.Authorization);
      navigate("/");
    },
    [navigate, updateToken, updateEmail]
  );

  return onSignup;
};

export default useSignup;
