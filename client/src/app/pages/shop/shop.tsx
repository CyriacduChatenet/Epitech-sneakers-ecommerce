import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ProductList } from "../../components/shop/product-list/product-list";
import Pagination from "../../components/common/pagination/pagination";
import ShopLayout from "../../components/shop/layout/layout";
import SneakerService from "../../services/sneaker.service";
import { Sneaker } from "../../types/sneaker.type";
import useDebounce from "../../hooks/useDebounce.hook";

const ShopPage: FC = () => {
  const sneakerService = new SneakerService();

  const [products, setProducts] = useState<Sneaker[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const { gender } = useParams();
  const pathname = window.location.pathname;
  const limit = 1000;

  const debouncedSearch = useDebounce(search, 2000);

  const fetchSneakers = async () => {
    try {
      const result = await sneakerService.findAll(
        `page=${page}&limit=${limit}&gender=${gender}&search=${encodeURIComponent(debouncedSearch)}`
      );

      if (result && result.data && Array.isArray(result.data.data)) {
        setProducts(result.data.data);
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
  }, [pathname, page]);

  return (
    <ShopLayout>
      <ProductList products={products} total={total} gender={`${gender}`} fetchDatas={fetchSneakers} setSearch={setSearch} />
      <Pagination total={total} page={page} limit={limit} setPage={setPage} />
    </ShopLayout>
  );
};

export default ShopPage;
