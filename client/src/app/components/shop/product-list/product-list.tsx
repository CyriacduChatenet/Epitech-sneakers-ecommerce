import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

import { ProductCard } from "../product-card/product-card";
import { Sneaker } from "../../../types/sneaker.type";

interface IProps {
  products: Sneaker[];
  total: number;
  gender: string;
  fetchDatas: () => void;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const ProductList: FC<IProps> = ({
  products,
  total,
  gender,
  fetchDatas,
  setSearch,
}) => {
  const capitalizeFirstLetter = (sentence: string) => {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetchDatas();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <section className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
            {capitalizeFirstLetter(`${gender}'s Shoes & Sneakers ( ${total} )`)}
          </h2>
          <form onSubmit={handleSubmit} className="flex items-center mb-8">
            <input
              type="text"
              placeholder="Search item"
              className="border mx-8 mt-2 px-4 py-2 w-80"
              onChange={(e) => handleChange(e)}
            />
            <button
              type="submit"
              className="rounded-md bg-orange-600 px-3.5 py-2.5 mt-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </form>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}

          {products.length === 0 && (
            <div className="min-h-">
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
