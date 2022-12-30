import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormButton from "components/Form/Button";
import ButtonContainer from "components/Form/ButtonContainer";
import FormHeader from "components/Form/Header";
import FormInput from "components/Form/Input";
import InputContainer from "components/Form/InputContainer";
import FormLabel from "components/Form/Label";
import useSignup from "hooks/useSingup";

const SignupFormContainer = styled.div`
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

interface ISignUpFormInput {
  email: string;
  password: string;
}

const SignupForm = () => {
  const navigate = useNavigate();
  const onSignUp = useSignup();

  const onNavigateToLogin: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        e.preventDefault();
        navigate("/login");
      },
      [navigate]
    );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUpFormInput>();

  const onSubmit: SubmitHandler<ISignUpFormInput> = (data) => {
    onSignUp(data);
  };

  return (
    <SignupFormContainer>
      <FormHeader title="Sign Up" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <FormLabel>Email</FormLabel>

          <FormInput
            placeholder="Enter your email"
            type="email"
            defaultValue="michio@michio.com"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
            })}
          />
          {errors.email && <span>This field is required</span>}
        </InputContainer>

        <InputContainer>
          <FormInput
            placeholder="Enter your password"
            type="password"
            defaultValue="michio"
            {...register("password", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </InputContainer>

        <ButtonContainer>
          <FormButton type="submit">Sign Up</FormButton>
        </ButtonContainer>
        <ButtonContainer>
          <FormButton onClick={onNavigateToLogin}>Go To Log In</FormButton>
        </ButtonContainer>
      </form>
    </SignupFormContainer>
  );
};

export default SignupForm;
