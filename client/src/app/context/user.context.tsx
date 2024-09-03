import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react";

type Context = {
    user: {
        email: string;
        id: string;
        roles: string;
    }
    setUser: Dispatch<SetStateAction<{
        email: string;
        id: string;
        roles: string;
    }>>;
};

interface IProps {
    children: ReactNode;
};

const UserContext = createContext<Context>({
    user: {
        email:'',
        id:'',
        roles:''
    },
    setUser: () => {},
});

export const UserProvider: FC<IProps> = ({ children }) => {
    const [user, setUser] = useState({ email: '', id:'', roles: ''});

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => useContext<Context>(UserContext);

export default useUser;