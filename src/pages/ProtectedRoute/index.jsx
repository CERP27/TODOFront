import { useAuth } from "../../context/Auth";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <h1>...Loading</h1>;
  if (!isLoading && !isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
};
