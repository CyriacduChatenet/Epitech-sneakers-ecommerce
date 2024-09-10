import { FC, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import HomePage from "../pages/home/home";
import SigninPage from "../pages/auth/signin";
import SignupPage from "../pages/auth/signup";
import Page404 from "../pages/errors/404";
import AdminDashboard from "../pages/admin/dashboard/dashboard";
import PrivateRoute from "./private.route";
import CookiesPolicyPage from "../pages/policies/cookies/cookies";
import ShopPage from "../pages/shop/shop";
import ShopItemPage from "../pages/shop/shop-item";
import ForgotPasswordPage from "../pages/auth/forgot-password";
import ResetPasswordPage from "../pages/auth/reset-password";
import AuthService from "../services/auth.service";
import useUser from "../context/user.context";

const AppRouter: FC = () => {
  const authService = new AuthService();
  const { setUser } = useUser();
  
  const handleIsAuthenticated = async () => {
    const response = await authService.isAuthenticated();
    if(response && response.data) {
      setUser(response.data);
    }
  };

  useEffect(() => {
    handleIsAuthenticated();
  }, []);

  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/shop/:gender" element={<ShopPage />} />
          <Route path="/shop/:category/product/:id" element={<ShopItemPage />} />

          <Route path="/signin" element={<SigninPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
          <Route path="/reset-password/:token" element={<ResetPasswordPage/>}/>

          <Route path="/policy/cookies" element={<CookiesPolicyPage/>}/>

          <Route path="/admin/dashboard" element={<PrivateRoute Component={AdminDashboard} />} />

          <Route path="*" element={<Page404 />}/>
        </Routes>
    </Router>
  );
};

export default AppRouter;
