import styled from "styled-components";

interface IFormHeader {
  title: string;
}

const Header = styled.h2`
  text-align: center;
  font-family: "open sans", sans-serif;
  padding: 2rem 0;
  margin: 0;
  font-size: 2rem;
`;

const FormHeader = ({ title }: IFormHeader) => {
  return <Header id="headerTitle">{title}</Header>;
};

export default FormHeader;
