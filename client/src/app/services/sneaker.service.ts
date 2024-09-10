import { CreateSneaker } from "../types/sneaker.type";
import { API } from "../utils/axios.utils";

class SneakerService {
    async findAll(query: string) {
        try {
            return await API().get("/sneaker?" + query);
        } catch (err) {
            console.error(err);
        }
    }

    async findOneById(id: string) {
        try {
            return await API().get(`/sneaker/${id}`);
        } catch (err) {
            console.error(err);
        }
    }

    async findOneByStockId(stockId: string) {
        try {
            return await API().get(`/sneaker/stock/${stockId}`);
        } catch (err) {
            console.error(err);
        }
    }

    async create(data: CreateSneaker) {
        try {
            return await API().post("/sneaker", data);
        } catch (err) {
            console.error(err);
        }
    }

    async update(id: string, data: CreateSneaker) {
        try {
            return await API().patch(`/sneaker/${id}`, data);
        } catch (err) {
            console.error(err);
        }
    }

    async delete(id: string) {
        try {
            return await API().delete(`/sneaker/${id}`);
        } catch (err) {
            console.error(err);
        }
    }
}

export default SneakerService;