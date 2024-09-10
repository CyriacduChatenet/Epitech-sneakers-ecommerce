import { FC } from "react"
import { ShoppingCart } from "../../../../types/shopping-cart.type"
import { Link } from "react-router-dom"
import useShoppingCart from "../../../../context/shopping-cart.context";

export const ShoppingCartCard: FC<ShoppingCart> = ({ quantity, name, thumbnail, price, price_id, id, size }) => {
    const { shoppingCart, setShoppingCart } = useShoppingCart();

    const handleRemove = (id: string) => {
        setShoppingCart(shoppingCart.filter((product) => product.id !== id));
    }

    const handleAddQuantity = (id: string) => {
        const newShoppingCart = shoppingCart.map((product) => {
            if (product.id === id) {
                return {
                    ...product,
                    quantity: product.quantity + 1
                }
            }
            return product;
        });
        setShoppingCart(newShoppingCart);
    }

    const handleSubstractQuantity = (id: string) => {
        const newShoppingCart = shoppingCart.map((product) => {
            if (product.id === id && product.quantity > 1) {
                return {
                    ...product,
                    quantity: product.quantity - 1
                }
            }
            return product;
        });
        setShoppingCart(newShoppingCart);
    }
    return (
        <li key={price_id} className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            alt={name}
            src={thumbnail}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <Link to={`/shop/product/${id}`}>{name}</Link>
              </h3>
              <p className="ml-4">{price} €</p>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <div className="w-48 flex justify-around items-center">
                <button onClick={() => handleSubstractQuantity(id)} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-base font-medium text-white shadow-sm hover:bg-indigo-700">-</button>
                <p className="text-gray-500">
                Quantity : {quantity}
                </p>
                <button onClick={() => handleAddQuantity(id)} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-base font-medium text-white shadow-sm hover:bg-indigo-700">+</button>
            </div>

            <div className="flex">
              <button
                onClick={() => handleRemove(id)}
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
    )
}