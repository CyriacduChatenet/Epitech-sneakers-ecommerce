import { API } from "../utils/axios.utils";

class UserService {
    findOneById(id: string) {
        try {
            return API().get(`/user/id/${id}`);
        } catch (err) {
            console.error(err);
        }
    }
}

export default UserService;