import type { DebtorType } from "./Debtor";

export interface CalendarUniqForDayType {
  id: string;
  debtId: string;
  amount: number;
  month: number;
  date: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  Debt: {
    id: string;
    productName: string;
    date: string;
    term: number;
    note: string;
    amount: number;
    debtorId: string;
    sellerId: string;
    createdAt: string;
    updatedAt: string;
    Debtor: DebtorType;
  };
}
export interface CalendarType {
  unpaidForDay: Array<CalendarUniqForDayType>;
  totalForMonth: number;
}
