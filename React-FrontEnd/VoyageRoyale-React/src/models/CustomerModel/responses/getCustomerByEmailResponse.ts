export interface GetCustomerByEmailResponse{
    id:number;
    email:string;
    password:string;
    authorities:string[];
}