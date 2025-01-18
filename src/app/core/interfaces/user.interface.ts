import { UserRole } from "../enums/user-role.enum";

export interface User {
    id: string;
    email: string;
    name: string;
    password:string
    role: UserRole;
  }