import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ILoginRequest } from 'services/auth/default/login';
import styled from 'styled-components';
import FormButton from 'components/Form/Button';
import ButtonContainer from 'components/Form/ButtonContainer';
import FormHeader from 'components/Form/Header';
import FormInput from 'components/Form/Input';
import InputContainer from 'components/Form/InputContainer';
import FormLabel from 'components/Form/Label';
import useLogin from 'hooks/useLogin';
import usePasskeyLogin from 'hooks/usePasskeyLogin';

const LoginFormContainer = styled.div`
  max-width: 500px;
  min-width: 300px;
  max-height: 700px;
  width: 30%;
  height: 60%;
  margin: 100px auto;
  background-color: #ffffff;
  border-radius: 25px;
  padding: 5rem;
`;

interface ILoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { onLogin, loading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<ILoginFormInputs>();

  const { loginPasskey } = usePasskeyLogin();

  const onPasskeyLogin = () => {
    const { email } = getValues();
    if (!email) {
      setError(
        'email',
        {
          message: 'This field is required for login with Passkey',
          type: 'required',
        },
        { shouldFocus: true },
      );
    } else {
      loginPasskey(email);
    }
  };

  const onSubmit: SubmitHandler<ILoginRequest> = (data) => {
    onLogin(data);
  };

  const onNavigateToSignUp: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      navigate('/signup');
    },
    [navigate],
  );

  return (
    <LoginFormContainer>
      <FormHeader title="Login" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <FormLabel>Email</FormLabel>

          <FormInput
            placeholder="Enter your email"
            type="email"
            autoComplete="webauthn"
            defaultValue="michio@michio.com"
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </InputContainer>

        <InputContainer>
          <FormInput
            placeholder="Enter your password"
            type="password"
            defaultValue="michio"
            {...register('password', { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </InputContainer>

        <ButtonContainer>
          <FormButton onClick={onPasskeyLogin} type="button">
            Passkey Login
          </FormButton>
        </ButtonContainer>

        <ButtonContainer>
          <FormButton type="submit">Log In</FormButton>
        </ButtonContainer>
        <ButtonContainer>
          <FormButton onClick={onNavigateToSignUp} type="button">
            Go To Sign Up
          </FormButton>
        </ButtonContainer>
      </form>
    </LoginFormContainer>
  );
};

export default LoginForm;
