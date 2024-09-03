import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react";

type Context = {
    user: Object
    setUser: Dispatch<SetStateAction<Object>>;
};

interface IProps {
    children: ReactNode;
};

const UserContext = createContext<Context>({
    user: {},
    setUser: () => {},
});

export const UserProvider: FC<IProps> = ({ children }) => {
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => useContext<Context>(UserContext);

export default useUser;