import { API } from "../utils/axios.utils";

class AuthService {
    async signin(credentials: { email: string, password: string }) {
        try {
            const token = (await API().post('/auth/signin', credentials)).data.accessToken;

            if(token) {
                window.localStorage.setItem('access_token', token);
                return true;
            }

            return false;
        } catch (err) {
            console.error(err);
        }
    }

    async signup(credentials: { email: string, username: string, password: string }) {
        try {
            return await API().post('/auth/signup', credentials);
        } catch (err) {
            console.error(err);
        }
    }

    signout() {
        try {
            return window.localStorage.removeItem('access_token');
        } catch (err) {
            console.error(err);
        }
    }

    isAuthenticated() {
        return localStorage.getItem('authToken') !== null;
      };

    async forgotPassword(email: string) {
        try {
            return await API().post('/auth/forgot-password', email);
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