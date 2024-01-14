import axios from "axios";

export default class CarService {
    getAll() : any {
        let i = axios.get("http://localhost:8080/api/cars/getAll")
        return i;
    }

    getById() : any {
        let i = axios.get("http://localhost:8080/api/cars/getById?id=1")
        return i;
    }
}
