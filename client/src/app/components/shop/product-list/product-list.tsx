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
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {gender}'s Shoes & Sneakers ({total})
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}

          {products.length === 0 && (<div className="min-h-96"><p>No products found</p></div>)}
        </div>
      </div>
    </div>
  );
};
