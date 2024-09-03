import { FC } from "react";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import AuthService from "../../services/auth.service";
import useUser from "../../context/user.context";
import { useNavigate } from "react-router-dom";

export const SigninForm: FC = () => {
    const authService = new AuthService();
    const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    console.log(data)
    const isAuth = await authService.signin(data);
    console.log('isAuth', isAuth);
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
    }

    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-col items-center justify-center">
        <label htmlFor="email">
            <p>Email</p>
            <input type="email" {...register("email", { required: true })} autoComplete="email" />
            {errors.email && <span className="text-red-500">This field is required</span>}
        </label>
        <label htmlFor="password">
            <p>Password</p>
            <input type="password" {...register("password", { required: true })} autoComplete="password" />
            {errors.email && <span className="text-red-500">This field is required</span>}
        </label>

      <input type="submit" className="bg-blue-600 text-white" />
    </form>
  );
};
