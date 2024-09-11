import { Stock } from "../types/stock.type";
import { API } from "../utils/axios.utils";

class StockService {
    async findAll(query: string) {
        try {
            return await API().get("/stock?" + query);
        } catch (err) {
            console.error(err);
        }
    }

    async findOneById(id: string) {
        try {
            return await API().get(`/stock/${id}`);
        } catch (err) {
            console.error(err);
        }
    }

    async create(data: Stock) {
        try {
            return await API().post("/stock", data);
        } catch (err) {
            console.error(err);
        }
    }

    async update(id: string, data: Stock) {
        try {
            return await API().patch(`/stock/${id}`, data);
        } catch (err) {
            console.error(err);
        }
    }

    async delete(id: string) {
        try {
            return await API().delete(`/stock/${id}`);
        } catch (err) {
            console.error(err);
        }
    }
}

export default StockService;