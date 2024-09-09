import { API } from "../utils/axios.utils";

class UserService {
    async findAll(query: string) {
        try {
            return await API().get(`/user?${query}`);
        } catch (err) {
            console.error(err);
        }
    }

    findOneById(id: string) {
        try {
            return API().get(`/user/id/${id}`);
        } catch (err) {
            console.error(err);
        }
    }

    findOneByEmail(email: string) {
        try {
            return API().get(`/user/${email}`);
        } catch (err) {
            console.error(err);
        }
    }
}

export default UserService;