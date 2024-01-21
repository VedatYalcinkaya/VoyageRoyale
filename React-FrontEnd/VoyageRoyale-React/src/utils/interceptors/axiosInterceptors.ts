import axios from "axios";

 const axiosInstance = axios.create({
    baseURL:"http://localhost:8080/api/",

 })

 axiosInstance.interceptors.request.use((config) =>{
    config.headers.Authorization = "My Token"
    console.log("Bir istek atıldı...")
    return config;
 } )

 axiosInstance.interceptors.response.use((value:any) =>{
    console.log("Başarılı bir cevap alındı...")

    return value;
 }, 
    error => {
        console.log("Bir hata ile karşılaşıldı", error.response.data)
        toastr.error(error.response.data)
        return Promise.reject(error.response.data);
    }
 
 )

 export default axiosInstance;