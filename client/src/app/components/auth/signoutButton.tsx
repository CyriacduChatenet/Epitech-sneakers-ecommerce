import { FC } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../../services/auth.service";
import useUser from "../../context/user.context";
import useAuth from "../../context/auth.context";

export const SignoutButton: FC = () => {
    const authService = new AuthService();
    const navigate = useNavigate();
    const { setUser } = useUser();
    const { setAuth } = useAuth();

    const handleSignout = () => {
        authService.signout();
        setUser({ email: "", id: "", roles: "" });
        setAuth(false);
        navigate('/signin');
    };
    return (
        <button onClick={handleSignout}>Logout</button>
    );
};

export default SignoutButton;