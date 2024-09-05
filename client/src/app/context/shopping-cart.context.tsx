import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react";

import { ShoppingCart } from "../types/shopping-cart.type";

type Context = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    shoppingCart: ShoppingCart[];
    setShoppingCart: Dispatch<SetStateAction<ShoppingCart[]>>; 
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
    const [shoppingCart, setShoppingCart] = useState<ShoppingCart[]>([]);

    return (
        <ShoppingCartContext.Provider value={{open, setOpen, setShoppingCart, shoppingCart}}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

const useShoppingCart = () => useContext<Context>(ShoppingCartContext);

export default useShoppingCart;