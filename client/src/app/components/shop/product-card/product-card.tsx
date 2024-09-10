import { FC } from "react";

import { Sneaker } from "../../../types/sneaker.type";
import { Link } from "react-router-dom";

interface IProps {
  data: Sneaker;
}

export const ProductCard: FC<IProps> = ({ data }) => {
  return (
    <Link to={`/shop/${data.gender}/product/${data.id}`}>
      <div>
        <img src={data.image.thumbnail} alt="" />
        <strong>{data.name}</strong>
        <p>{data.retailPrice} €</p>
      </div>
    </Link>
  );
};
