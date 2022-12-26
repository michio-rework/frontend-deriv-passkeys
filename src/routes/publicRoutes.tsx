import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
export type PublicRouteProps = {
  authenticatedRoute?: string;
  outlet: JSX.Element;
};

export default function PublicRoute({
  outlet,
  authenticatedRoute = "/login",
}: PublicRouteProps) {
  const { token } = useAuth();
  if (token) {
    return <Navigate to={{ pathname: authenticatedRoute }} />;
  } else {
    return outlet;
  }
}
