import { API } from "../utils/axios.utils";

export class AppService {
    async getHello () {
        return API().get('/')
    }
}