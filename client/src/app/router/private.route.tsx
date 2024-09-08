import { Navigate } from "react-router-dom";
import { ElementType } from "react";

import useAuth from "../context/auth.context";

const PrivateRoute = ({ Component }: { Component: ElementType }) => {
    const { auth } = useAuth();
 
  return auth ? <Component /> : <Navigate to="/signin" />;
};
export default PrivateRoute;