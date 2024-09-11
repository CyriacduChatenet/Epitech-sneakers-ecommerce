import { Size } from "../types/size.type";
import { API } from "../utils/axios.utils";

class SizeService {
    async findAll(query: string) {
        try {
            return await API().get("/size?" + query);
        } catch (err) {
            console.error(err);
        }
    }

    async findOneById(id: string) {
        try {
            return await API().get(`/size/${id}`);
        } catch (err) {
            console.error(err);
        }
    }

    async create(data: Size) {
        try {
            return await API().post("/size", data);
        } catch (err) {
            console.error(err);
        }
    }

    async update(id: string, data: Size) {
        try {
            return await API().patch(`/size/${id}`, data);
        } catch (err) {
            console.error(err);
        }
    }

    async delete(id: string) {
        try {
            return await API().delete(`/size/${id}`);
        } catch (err) {
            console.error(err);
        }
    }
}

export default SizeService;