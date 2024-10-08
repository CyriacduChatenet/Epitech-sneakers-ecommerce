import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../../services/auth.service";
import useUser from "../../context/user.context";
import { Role } from "../../enums/role.enum";
import useAuth from "../../context/auth.context";
import { AxiosError } from "axios";

interface SigninFormData {
  email: string;
  password: string;
}

export const SigninForm: FC = () => {
  const authService = new AuthService();
  const { setUser } = useUser();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string>("");

  const onSubmit = async (data: SigninFormData) => {
    try {
      const isAuth = await authService.signin(data);

      if (isAuth) {
        setAuth(isAuth);
        const encodedToken = window.localStorage.getItem("access_token");

        if (encodedToken) {
          const decodedToken: {
            email: string;
            id: string;
            roles: string;
          } = jwtDecode(encodedToken);

          setUser({
            email: decodedToken.email,
            id: decodedToken.id,
            roles: decodedToken.roles,
          });

          if (decodedToken.roles === Role.Admin) {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        }
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(err);
        setAuthError(err.response?.data?.message || "An error occurred");
      } else if (err instanceof Error) {
        console.error(err);
        setAuthError(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="text-sm">
            <Link
              to={"/forgot-password"}
              className="font-semibold text-orange-600 hover:text-orange-500"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            type="password"
            {...register("password", { required: true })}
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {authError && <span className="text-red-500">{authError}</span>}
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};
