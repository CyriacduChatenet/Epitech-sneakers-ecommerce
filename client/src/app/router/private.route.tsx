import { Navigate } from "react-router-dom";

import useAuth from "../context/auth.context";

const PrivateRoute = ({ Component }) => {
    const { auth } = useAuth();
 
  return auth ? <Component /> : <Navigate to="/signin" />;
};
export default PrivateRoute;