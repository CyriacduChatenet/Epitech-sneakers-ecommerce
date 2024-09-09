import { jwtDecode } from "jwt-decode";

import { API } from "../utils/axios.utils";
import UserService from "./user.service";

class AuthService {
  userService = new UserService();

  async signin(credentials: { email: string; password: string }) {
    try {
      const token = (await API().post("/auth/signin", credentials)).data
        .accessToken;

      if (token) {
        window.localStorage.setItem("access_token", token);
        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
    }
  }

  async signup(credentials: {
    email: string;
    username: string;
    password: string;
  }) {
    try {
      return await API().post("/auth/signup", credentials);
    } catch (err) {
      console.error(err);
    }
  }

  signout() {
    try {
      return window.localStorage.removeItem("access_token");
    } catch (err) {
      console.error(err);
    }
  }

  async isAuthenticated() {
    try {
      const token = localStorage.getItem("access_token");

      if (token !== null && token !== undefined) {
        const decodedToken = jwtDecode(token) as { email: string; exp: number, iat: number, id: string, roles: string };
        const user = await this.userService.findOneByEmail(decodedToken.email);

        if (decodedToken.exp !== undefined && decodedToken.exp < Date.now() / 1000) {
          console.info("Token is valid", decodedToken);
        }

        return user;
      }
      return false;
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        console.error("Token is expired !");
      } else if (err.name === "JsonWebTokenError") {
        console.error("Token is invalid !");
      } else {
        console.error("Error during token checking:", err.message);
      }
      return null;
    }
  }

  async forgotPassword(email: string) {
    try {
      return await API().post("/auth/forgot-password", email);
    } catch (err) {
      console.error(err);
    }
  }

  async resetPassword(password: string, token: string) {
    try {
      return await API().post(`/auth/reset-password/${token}`, password);
    } catch (err) {
      console.error(err);
    }
  }
}

export default AuthService;
