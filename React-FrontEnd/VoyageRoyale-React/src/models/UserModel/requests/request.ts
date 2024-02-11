export interface UserRequest {
  email: string | null;
  password: string | null;
  firstName: string | null;
  lastName: string;
  tcNo: string;
  birthDate: string;
  authorities:string[];
}
