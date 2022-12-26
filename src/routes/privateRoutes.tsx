import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
export type PrivateRouteProps = {
  authenticatedRoute?: string;
  outlet: JSX.Element;
};

export default function PrivateRoute({
  outlet,
  authenticatedRoute = "/login",
}: PrivateRouteProps) {
  const { token } = useAuth();
  if (token) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticatedRoute }} />;
  }
}
