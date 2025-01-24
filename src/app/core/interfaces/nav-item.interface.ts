import { UserRole } from "../enums/user-role.enum";

export interface NavItem {
    path: string; 
    icon: string;
    label: string;
    roles: UserRole[];
    showOnDetail?: boolean;
   }