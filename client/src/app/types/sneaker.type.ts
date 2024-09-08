import { Stock } from "./stock.type";

export type Sneaker = {
createdAt: Date;
updatedAt: Date;
deletedAt: Date;
id: string;
brand: string;
colorway: string;
estimatedMarketValue: number;
gender: "men" | "woman" | "unisex";
image: {
    360: [];
    small: string;
    thumbnail: string;
    original: string;
}
links: {
    goat: string;
    stockx: string;
    flightClub: string;
    stadiumGoods: string;
}
name: string;
releaseDate: Date;
releaseYear: string;
retailPrice: string;
silhouette: string;
sku: string;
story: "";
publishedAt: Date;
UID: string;
stripe_price_id: string;
stripe_product_id: string;
stocks: Stock[]
}