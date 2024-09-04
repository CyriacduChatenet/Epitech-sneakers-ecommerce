import { FC } from "react";

import { ProductList } from "../../components/shop/product-list/product-list";
import Pagination from "../../components/common/pagination/pagination";
import { Navigation } from "../../components/shop/navigation/navigation";

const ShopPage: FC = () => {
    return (
        <div>
            <Navigation/>
            <ProductList />
            <Pagination />
        </div>
    );
}

export default ShopPage;