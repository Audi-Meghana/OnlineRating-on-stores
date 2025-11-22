import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ roles = [], children }) {

  const { user } = useAuth();

  // USER NOT LOGGED IN
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // USER LOGGED BUT ROLE NOT ALLOWED
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // ALLOWED → SHOW PAGE
  return children;
}
