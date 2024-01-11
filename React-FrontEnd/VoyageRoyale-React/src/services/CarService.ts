import axios from "axios";

export default class CarService {
    getAll() : any {
        let i = axios.get("http://localhost:8080/api/cars/getAll")
        return i;
    }
}
