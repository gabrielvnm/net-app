export interface User {
  id: number;
  fullName: string;
  age: number;
}

export interface Transaction {
  id: number;
  description: string;
  value: number;
  type: 'Receita' | 'Despesa';
  userId: number;
}

export interface TransactionSummary {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}