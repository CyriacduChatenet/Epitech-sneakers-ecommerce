import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ProductList } from "../../components/shop/product-list/product-list";
import Pagination from "../../components/common/pagination/pagination";
import ShopLayout from "../../components/shop/layout/layout";
import SneakerService from "../../services/sneaker.service";
import { Sneaker } from "../../types/sneaker.type";

const ShopPage: FC = () => {
  const sneakerService = new SneakerService();

  const [products, setProducts] = useState<Sneaker[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const { gender } = useParams();

  const fetchSneakers = async () => {
    try {
      const result = await sneakerService.findAll(
        `page=${page}&limit=100&gender=${gender}`
      );
      console.log("API Response:", result);

      if (result && result.data && Array.isArray(result.data.data)) {
        const data = result.data.data;

        console.log("Transformed data:", data);
        setProducts(data);
        setTotal(result.data.total);
      } else {
        console.error("Structure de la réponse de l'API inattendue :", result);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des sneakers :", error);
    }
  };

  useEffect(() => {
    fetchSneakers();
  }, []);

  return (
    <ShopLayout>
      <ProductList products={products} total={total} gender={`${gender}`} />
      <Pagination total={total} page={page} setPage={setPage} />
    </ShopLayout>
  );
};

export default ShopPage;
