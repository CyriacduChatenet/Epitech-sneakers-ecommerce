import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import AuthService from "../../services/auth.service";

interface IProps {
  setShowBanner: Dispatch<SetStateAction<boolean>>;
}

interface ForgotPasswordFormData {
  email: string;
}

export const ForgotPasswordForm: FC<IProps> = ({ setShowBanner }) => {
  const authService = new AuthService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const response = await authService.forgotPassword(data.email);

    if (response?.data) {
      setShowBanner(true);
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
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Send reset password link
        </button>
      </div>
    </form>
  );
};
