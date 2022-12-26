import FormButton from "../../components/Form/Button";
import ButtonContainer from "../../components/Form/ButtonContainer";
import FormHeader from "../../components/Form/Header";
import usePasskeyRegister from "../../hooks/usePasskeyRegister";

const HomePage = () => {
  const { registerVerified, registerPasskey } = usePasskeyRegister();

  return (
    <div>
      <FormHeader title="Add Passkey" />
      <ButtonContainer>
        <FormButton onClick={registerPasskey}>Add Passkey</FormButton>
      </ButtonContainer>
    </div>
  );
};

export default HomePage;
