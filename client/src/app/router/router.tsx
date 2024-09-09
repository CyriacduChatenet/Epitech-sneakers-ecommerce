import { FC } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import HomePage from "../pages/home/home";
import SigninPage from "../pages/auth/signin";
import SignupPage from "../pages/auth/signup";
import Page404 from "../pages/errors/404";
import Dashboard from "../pages/user/dashboard/dashboard";
import AdminDashboard from "../pages/admin/dashboard/dashboard";
import PrivateRoute from "./private.route";
import CookiesPolicyPage from "../pages/policies/cookies/cookies";
import ShopPage from "../pages/shop/shop";
import ShopItemPage from "../pages/shop/shop-item";
import ForgotPasswordPage from "../pages/auth/forgot-password";
import ResetPasswordPage from "../pages/auth/reset-password";

const AppRouter: FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/shop/:gender" element={<ShopPage />} />
          <Route path="/shop/product/:id" element={<ShopItemPage />} />

          <Route path="/signin" element={<SigninPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
          <Route path="/reset-password/:token" element={<ResetPasswordPage/>}/>

          <Route path="/policy/cookies" element={<CookiesPolicyPage/>}/>

          <Route path="/dashboard" element={<PrivateRoute Component={Dashboard} />} />
          <Route path="/admin/dashboard" element={<PrivateRoute Component={AdminDashboard} />} />

          <Route path="*" element={<Page404 />}/>
        </Routes>
    </Router>
  );
};

export default AppRouter;
