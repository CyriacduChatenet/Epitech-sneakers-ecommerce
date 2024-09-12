import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import AuthService from "../../services/auth.service";

interface IProps {
  setShowBanner: Dispatch<SetStateAction<boolean>>;
}

interface ResetPasswordFormData {
  password: string;
}

export const ResetPasswordForm: FC<IProps> = ({ setShowBanner }) => {
  const authService = new AuthService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();
  const navigate = useNavigate();

  const pathname = window.location.pathname;

  const token = pathname.split("/")[2];

  const onSubmit = async (data: ResetPasswordFormData) => {
    const response = await authService.resetPassword(data.password, token);

    if (response?.data) {
      setShowBanner(true);
      navigate("/signin");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
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
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Reset password
        </button>
      </div>
    </form>
  );
};
