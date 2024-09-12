import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import UserService from "../../../services/user.service";
import useUser from "../../../context/user.context";
import useShoppingCart from "../../../context/shopping-cart.context";
import PaymentService from "../../../services/payment.service";
import { ShoppingCartCard } from "./shopping-cart-card/shopping-cart-card";
import { ShoppingCart as ShoppingCartType } from "../../../types/shopping-cart.type";

export const ShoppingCart = () => {
  const paymentService = new PaymentService();
  const { user } = useUser(); 
  const { open, setOpen, shoppingCart } = useShoppingCart();
  const [stripeCustomerId, setStripeCustomerId] = useState("");
  const [total, setTotal] = useState(0);

  const userService = new UserService();

  const handlePayed = async () => {
    return await paymentService.createCheckoutSession(shoppingCart, stripeCustomerId);
  };

  const getTotal = () => {
    setTotal(shoppingCart.reduce((acc, product) => acc + product.price * product.quantity, 0));
  }

  const  fetchUserById = async () => {
    const userInDB = await userService.findOneById(user.id);
    setStripeCustomerId(userInDB?.data?.customer?.stripeId);
  }

  useEffect(() => {
    fetchUserById();
  }, []);

  useEffect(() => {
    getTotal();
  }, [shoppingCart]);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {shoppingCart.map((product: ShoppingCartType) => (
                          <ShoppingCartCard key={product.id} id={product.id} thumbnail={product.thumbnail} price={product.price} price_id={product.price_id} quantity={product.quantity} name={product.name} size={product.size} />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{total} €</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <button
                    onClick={handlePayed}
                      className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700"
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-orange-600 hover:text-orange-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
