import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react";

type Context = {
    auth: boolean;
    setAuth: Dispatch<SetStateAction<boolean>>;
};

interface IProps {
    children: ReactNode;
};

const authContext = createContext<Context>({
    auth: false,
    setAuth: () => {},
});

export const AuthProvider: FC<IProps> = ({ children }) => {
    const [auth, setAuth] = useState(false);

    return (
        <authContext.Provider value={{auth, setAuth}}>
            {children}
        </authContext.Provider>
    );
};

const useAuth = () => useContext<Context>(authContext);

export default useAuth;