import { FC } from "react";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import AuthService from "../../services/auth.service";
import useUser from "../../context/user.context";
import { useNavigate } from "react-router-dom";
import { Role } from "../../enums/role.enum";
import useAuth from "../../context/auth.context";

export const SigninForm: FC = () => {
    const authService = new AuthService();
    const { setUser } = useUser();
    const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    const isAuth = await authService.signin(data);

    if(isAuth) {
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
  
        if(decodedToken.roles === Role.Admin) {
          navigate('/admin/dashboard');
      } else {
          navigate('/dashboard');
      }
    }
    }
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
