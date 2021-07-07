export interface CreditCard {
  number: string;
}

export interface Invoice{
  id: string;
  amount: number;
  payment_date: string;
  store: string;
  description: string;
  created_at: string;
}