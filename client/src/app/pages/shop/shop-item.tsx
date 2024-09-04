import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import SneakerService from "../../services/sneaker.service";
import { Sneaker } from "../../types/sneaker.type";

const ShopItemPage: FC = () => {
  const [sneaker, setSneaker] = useState<Sneaker>();
  const { id } = useParams();
  const sneakerService = new SneakerService();

  const fetchSneaker = () => {
    console.log(id);
    sneakerService.findOneById(`${id}`).then((res) => {
      setSneaker(res?.data);
    });
  };

  useEffect(() => {
    fetchSneaker();
  }, []);
  return (
    <main>
      <Link to={"/shop"}>Shop</Link>
      <section className="flex justify-between">
        <div className="w-1/2">
        <img src={sneaker?.image.original} alt="sneaker thumbnail" />
        </div>
        <div className="w-1/2">
          <h1>{sneaker?.name}</h1>
        </div>
      </section>
    </main>
  );
};

export default ShopItemPage;
