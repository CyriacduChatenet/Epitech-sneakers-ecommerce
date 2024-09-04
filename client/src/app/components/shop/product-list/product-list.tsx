import { FC } from "react";

import { ProductCard } from "../product-card/product-card";
import { Sneaker } from "../../../types/sneaker.type";

interface IProps {
  products: Sneaker[];
  total: number;
  gender: string;
}

export const ProductList: FC<IProps> = ({ products, total, gender }) => {

  return (
    <section className="w-3/4" style={{ margin: "5% 12.5% 0 12.5%" }}>
      <h1 className="font-semibold text-2xl">{gender}'s Shoes & Sneakers ({total})</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-around items-center">
          {products.map((sneaker: Sneaker) => (
            <ProductCard key={sneaker.id} data={sneaker} />
          ))}
        </div>
      ) : (
        <p>No sneakers found for {gender}.</p>
      )}
    </section>
  );
};
