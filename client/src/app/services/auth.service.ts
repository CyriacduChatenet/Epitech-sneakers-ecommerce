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
            await API().post('/auth/signup', credentials);
        } catch (err) {
            console.error(err);
        }
    }
}

export default AuthService;