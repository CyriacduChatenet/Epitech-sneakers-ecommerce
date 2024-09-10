import { FC } from "react";

import { Sneaker } from "../../../types/sneaker.type";
import { Link } from "react-router-dom";

interface IProps {
  data: Sneaker;
}

export const ProductCard: FC<IProps> = ({ data }) => {
  return (
    // <Link to={`/shop/${data.gender}/product/${data.id}`}>
    //   <div>
    //     <img src={data.image.thumbnail} alt="" />
    //     <strong>{data.name}</strong>
    //     <p>{data.retailPrice} €</p>
    //   </div>
    // </Link>

    <div key={data.id} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          alt={data.image.thumbnail}
          src={data.image.thumbnail}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/shop/${data.gender}/product/${data.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {data.name}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">{data.retailPrice} €</p>
      </div>
    </div>
  );
};
