import { FC } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import HomePage from "../pages/home/home";
import SigninPage from "../pages/auth/signin";
import SignupPage from "../pages/auth/signup";
import Page404 from "../pages/errors/404";
import PrivateRoute from "./private.route";
import Dashboard from "../pages/user/dashboard/dashboard";
import AdminDashboard from "../pages/admin/dashboard/dashboard";

const AppRouter: FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/signin" element={<SigninPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>

          <Route element={<PrivateRoute user={{}} isAdminRoute={false}/>}>
            <Route path="/dashboard" element={<Dashboard/>} />
          </Route>

          <Route element={<PrivateRoute user={{}} isAdminRoute={true}/>}>
            <Route path="/dashboard-admin" element={<AdminDashboard/>} />
          </Route>

          <Route path="*" element={<Page404 />}/>
        </Routes>
    </Router>
  );
};

export default AppRouter;
