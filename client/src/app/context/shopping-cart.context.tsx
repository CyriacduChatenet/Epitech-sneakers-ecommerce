import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react";

type Context = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

interface IProps {
    children: ReactNode;
};

const ShoppingCartContext = createContext<Context>({
    open: false,
    setOpen: () => {},
});

export const ShoppingCartProvider: FC<IProps> = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <ShoppingCartContext.Provider value={{open, setOpen}}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

const useShoppingCart = () => useContext<Context>(ShoppingCartContext);

export default useShoppingCart;