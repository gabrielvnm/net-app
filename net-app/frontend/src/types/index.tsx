export type TabId = 'totais' | 'usuarios' | 'transacoes';

// export interface User {
//   id: number;
//   fullName: string;
//   age: number;
// }

export interface Transaction {
  id: number;
  description: string;
  value: number;
  type: 'despesa' | 'receita';
  userId: number;
}

export interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

export interface User {
  id: number;
  fullName: string;
  age: number;
  birthDate?: string; 
}

// export interface Transaction {
//   id: number;
//   description: string;
//   value: number;
//   type: 'receita' | 'despesa';
//   userId: number;
//   user?: User;
// }

// export interface TransactionSummary {
//   totalReceitas: number;
//   totalDespesas: number;
//   saldo: number;
// }