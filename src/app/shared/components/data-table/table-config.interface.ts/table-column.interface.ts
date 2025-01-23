import { TableAction } from "./table-action.interface";

export interface TableColumn {
    key: string;
    header: string;
    type?: 'text' | 'date' | 'currency' | 'dateRange' | 'status' | 'action';
    format?: string;
    actions?: TableAction[];
  }
