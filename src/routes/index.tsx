import { Route, Routes } from "react-router-dom";
import Layout from "components/Layout";
import Header from "features/header";
import NotFound from "pages/404";
import HomePage from "pages/home";
import LoginPage from "pages/login";
import SignUpPage from "pages/signup";
import PrivateRoute from "./privateRoutes";
import PublicRoute from "./publicRoutes";

const AppRouter = () => {
  return (
    <Layout>
      <Header />
      <Routes>
        <Route index element={<PrivateRoute outlet={<HomePage />} />} />
        <Route
          path="/signup"
          element={
            <PublicRoute outlet={<SignUpPage />} authenticatedRoute={"/"} />
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute outlet={<LoginPage />} authenticatedRoute={"/"} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default AppRouter;
