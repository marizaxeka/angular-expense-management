export interface TableAction {
    icon: string;
    tooltip: string;
    action: (item: any) => void;
    condition?: (item: any) => boolean;
    color?: string;
  }
  
  