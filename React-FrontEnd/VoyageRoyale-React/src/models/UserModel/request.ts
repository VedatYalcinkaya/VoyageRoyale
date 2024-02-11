export interface UserRequest {
  email: string
  password: string
  firstName: string | null;
  lastName: string;
  tcNo: string;
  birthDate: Date | null;
}
