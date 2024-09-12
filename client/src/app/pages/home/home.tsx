import { useLocation } from "react-router-dom";

import { Modal } from "../../components/common/modal/modal";
import { Herobanner } from "../../components/shop/herobanner/herobanner";
import ShopLayout from "../../components/shop/layout/layout";

const HomePage = () => {
  const location = useLocation();
  return (
    <ShopLayout>
      <Herobanner />
      {location.search.split("=")[1] === "success" ? (
        <Modal title="Payment success">
          <div className="mt-2 flex items-center justify-around">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500">
              Your payment is done. Check you mailbox to have your invoice.
            </p>
          </div>
        </Modal>
      ) : location.search.split("=")[1] === "cancel" ? (
        <Modal title="Payment error">
          <div className="mt-2 flex items-center justify-around">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500">
              We are sorry but there is an error in payment process.
            </p>
          </div>
        </Modal>
      ) : null}
    </ShopLayout>
  );
};

export default HomePage;
