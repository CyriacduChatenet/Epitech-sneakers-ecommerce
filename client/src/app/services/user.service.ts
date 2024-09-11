import { User } from "../types/user.type";
import { API } from "../utils/axios.utils";

class UserService {
  findAll(query: string) {
    try {
      return API().get(`/user?${query}`);
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

  async update(id: string, data: Partial<User>) {
    try {
      return (await API().patch(`/user/${id}`, data)).data;
    } catch (err) {
      console.error(err);
    }
  }

  delete(id: string) {
    try {
      return API().delete(`/user/${id}`);
    } catch (err) {
      console.error(err);
    }
  }
}

export default UserService;
