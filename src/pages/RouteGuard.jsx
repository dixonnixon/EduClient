import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

function RouteGuard({ children }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <></>;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default RouteGuard;