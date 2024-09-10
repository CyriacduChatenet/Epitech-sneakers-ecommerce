import { Stock } from "./stock.type";

export type ShoppingCart = { 
    price_id: string, 
    quantity: number, 
    name: string;
    thumbnail: string;
    price: number;
    id: string;
    size?: Stock;
}