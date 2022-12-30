import LoginForm from "features/loginform";

const LoginPage = () => {
  console.log(import.meta.env.VITE_SERVER_BASE_URL);
  return <LoginForm />;
};

export default LoginPage;
