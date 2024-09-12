import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

import { User } from "../../../types/user.type";
import UserService from "../../../services/user.service";

interface IProps {
  edit: boolean;
  user?: User;
  setState?: Dispatch<SetStateAction<User[]>>
}

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  roles: string;
}

export const AdminUserForm: FC<IProps> = ({ edit, user, setState }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>();

  const userService = new UserService();

  const onSubmit = async (data: SignupFormData) => {
    if (user && edit && setState) {
      const updatedUser = await userService.update(user.id, data);
      if (updatedUser) {
        setState((prev) =>
          prev.map((u) => (u.id === user.id ? updatedUser : u))
        );
      }
    } else {
      const newUser = await userService.create(data);
      if (newUser && setState) {
        setState((prev) => [...prev, newUser.data]);
      }
    }
  };

  useEffect(() => {
    if (user && edit) {
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("password", user.password);
      setValue("roles", user.roles);
    }
  }, [user, setValue]);

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Username
        </label>
        <div className="mt-2">
          <input
            id="username"
            type="text"
            {...register("username", { required: true })}
            autoComplete="username"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
          {errors.username && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
      </div>

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
        <label
          htmlFor="roles"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Role
        </label>
        <div className="mt-2">
          <input
            id="roles"
            type="text"
            {...register("roles", { required: true })}
            autoComplete="roles"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />
          {errors.username && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          {edit ? "Edit user" : "Add new user"}
        </button>
      </div>
    </form>
  );
};
