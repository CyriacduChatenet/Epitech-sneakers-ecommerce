import { useEffect } from "react";
import useUser from "../context/user.context";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const { setUser } = useUser();

  useEffect(() => {
    const encodedToken = window.localStorage.getItem('access_token');

    if(encodedToken) {
        const decodedToken = jwtDecode(encodedToken);
        setUser(decodedToken);
    }
  }, [])
};

export default useAuth;
