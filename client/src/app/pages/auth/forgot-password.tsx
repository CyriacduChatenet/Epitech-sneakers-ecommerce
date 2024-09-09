import { FC, useState } from "react";
import { Link } from "react-router-dom";

import ShopLayout from "../../components/shop/layout/layout";
import { ForgotPasswordForm } from "../../components/auth/forgotPasswordForm";
import { Banner } from "../../components/common/banner/banner";

const ForgotPasswordPage: FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  return (
    <ShopLayout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 my-40">
        {showBanner && <Banner setShowBanner={setShowBanner} message="We have sent you an email with instructions to reset your password." />}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot your password?
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <ForgotPasswordForm setShowBanner={setShowBanner} />
          <p className="mt-10 text-center text-sm text-gray-500">
            Do you have your password?{" "}
            <Link
              to={"/signin"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </ShopLayout>
  );
};

export default ForgotPasswordPage;
