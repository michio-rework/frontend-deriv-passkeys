import useAuth from "hooks/useAuth";
import styled from "styled-components";

const Container = styled.header`
  width: 100%;
  position: absolute;
  top: 0;
  height: 5rem;
  background: gray;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
  gap: 2rem;
`;

const Header = () => {
  const { token, email, logout } = useAuth();

  return token ? (
    <Container>
      <div>{email}</div>
      <button onClick={logout}>Log out</button>
    </Container>
  ) : null;
};

export default Header;
