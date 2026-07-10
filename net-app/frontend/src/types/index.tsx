// interfaces para usar nos outros arquivos da aplicação
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

// array com as abas de navegação do nav
export type TabId = 'home' | 'usuarios' | 'transacoes' | 'totais';