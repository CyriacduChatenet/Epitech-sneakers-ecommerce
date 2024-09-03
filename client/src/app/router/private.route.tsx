import { FC } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: FC<any> = ({ user, isAdminRoute, children }) => {
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if(!isAdminRoute) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default PrivateRoute;
