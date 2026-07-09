export interface User {
  id: number;
  fullName: string;
  dateOfBirth: string;
  age?: number;
}

export interface Transaction {
  id: number;
  description: string;
  value: number;
  type: 'Receita' | 'Despesa';
  userId: number;
  createdAt?: string;
}

export interface TransactionSummary {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}
export type TabId = 'home' | 'usuarios' | 'transacoes' | 'totais';