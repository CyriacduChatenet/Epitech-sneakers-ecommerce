import { FC, useState } from "react";

import ShopLayout from "../../components/shop/layout/layout";
import { Banner } from "../../components/common/banner/banner";
import { ResetPasswordForm } from "../../components/auth/resetPasswordForm";

const ResetPasswordPage: FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  return (
    <ShopLayout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 my-40">
        {showBanner && (
          <Banner
            setShowBanner={setShowBanner}
            message="Your password has been modified"
          />
        )}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <svg
            className="mx-auto"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="50%"
              y="50%"
              font-family="Arial"
              font-size="48"
              fill="#F97316"
              text-anchor="middle"
              dominant-baseline="middle"
            >
              K
            </text>
          </svg>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset your password?
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <ResetPasswordForm setShowBanner={setShowBanner} />
        </div>
      </div>
    </ShopLayout>
  );
};

export default ResetPasswordPage;
