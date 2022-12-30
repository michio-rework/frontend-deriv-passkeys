import styled from "styled-components";

const FormButton = styled.button`
  border-radius: 25px;
  width: 80%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: white;
  font-weight: 700;
  background: rgb(34, 193, 195);
  background: linear-gradient(
    90deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  border: 0px;
  cursor: pointer;
  transition: opacity 0.25s ease-out;
`;

export default FormButton;
