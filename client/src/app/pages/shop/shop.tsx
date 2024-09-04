import { FC, useEffect, useState } from "react";

import { ProductList } from "../../components/shop/product-list/product-list";
import Pagination from "../../components/common/pagination/pagination";
import ShopLayout from "../../components/shop/layout/layout";
import SneakerService from "../../services/sneaker.service";
import { Sneaker } from "../../types/sneaker.type";
import { useParams } from "react-router-dom";

const ShopPage: FC = () => {
  const sneakerService = new SneakerService();

  const [products, setProducts] = useState<Sneaker[]>([]);
  const [total, setTotal] = useState<number>(0);
  const { gender } = useParams();

  const fetchSneakers = async () => {
    const result = await sneakerService.findAll(
      `page=1&limit=100&gender=${gender}`
    );
    setProducts(result?.data.data);
    setTotal(result?.data.total);
  };

  useEffect(() => {
    fetchSneakers();
  }, [gender]);

  return (
    <ShopLayout>
      <ProductList products={products} total={total} gender={`${gender}`} />
      <Pagination total={total} />
    </ShopLayout>
  );
};

export default ShopPage;
