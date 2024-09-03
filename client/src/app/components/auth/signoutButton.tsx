import { FC } from "react";

import useUser from "../../context/user.context";

export const SignoutButton: FC = () => {
    const useDisconnected = () => {
        const { setUser } = useUser();
      
        setUser({ email: "", id: "", roles: "" });
        window.localStorage.removeItem("access_token");
        window.location.replace('/')
      };

  return <button onClick={useDisconnected}>Logout</button>;
};
