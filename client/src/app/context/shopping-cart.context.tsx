import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react";

type Context = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    shoppingCart: any[];
    setShoppingCart: Dispatch<SetStateAction<any[]>>; 
};

interface IProps {
    children: ReactNode;
};

const ShoppingCartContext = createContext<Context>({
    open: false,
    setOpen: () => {},
    shoppingCart: [],
    setShoppingCart: () => {},
});

export const ShoppingCartProvider: FC<IProps> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [shoppingCart, setShoppingCart] = useState<any[]>([]);

    return (
        <ShoppingCartContext.Provider value={{open, setOpen, setShoppingCart, shoppingCart}}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

const useShoppingCart = () => useContext<Context>(ShoppingCartContext);

export default useShoppingCart;