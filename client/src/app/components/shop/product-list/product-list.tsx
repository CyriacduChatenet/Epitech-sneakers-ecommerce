import { FC, useEffect, useState } from "react";

import { ProductCard } from "../product-card/product-card";
import SneakerService from "../../../services/sneaker.service";
import { Sneaker } from "../../../types/sneaker.type";

export const ProductList: FC = () => {
    const sneakerService = new SneakerService();

    const [sneakers, setSneakers] = useState<Sneaker[]>([]);

    const fetchSneakers = async () => {
        const result = await sneakerService.findAll('page=1&limit=100');
        setSneakers(result?.data.data);
    };

    useEffect(() => {
        fetchSneakers();
    }, []);

    return (
        <div className="flex flex-wrap justify-around items-center">
            {sneakers ? sneakers.map((sneaker: Sneaker) => <ProductCard key={sneaker.id} data={sneaker} />) : <p>No sneakers found</p>}
        </div>
    );
};