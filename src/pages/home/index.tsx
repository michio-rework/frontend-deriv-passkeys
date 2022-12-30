import styled from "styled-components";
import FormButton from "components/Form/Button";
import ButtonContainer from "components/Form/ButtonContainer";
import FormHeader from "components/Form/Header";
import UserView from "features/userView";
import usePasskeyRegister from "hooks/usePasskeyRegister";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 50rem;
`;

const HomePage = () => {
  const { registerVerified, registerPasskey } = usePasskeyRegister();

  return (
    <Container>
      <FormHeader title="Add Passkey" />
      <UserView />
      <ButtonContainer>
        <FormButton onClick={registerPasskey}>Add Passkey</FormButton>
      </ButtonContainer>
    </Container>
  );
};

export default HomePage;
