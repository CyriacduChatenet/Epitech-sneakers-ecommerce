import { FC } from "react";

import { SigninForm } from "../../components/auth/signinForm";
import ShopLayout from "../../components/shop/layout/layout";
import { Link } from "react-router-dom";

const SigninPage: FC = () => {
  return (
    <ShopLayout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 my-40">
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <SigninForm />
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to={"/signup"}
              className="font-semibold leading-6 text-orange-600 hover:text-orange-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </ShopLayout>
  );
};

export default SigninPage;