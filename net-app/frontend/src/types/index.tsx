export interface User {
  id: number;
  fullName: string;
  age: number;
}

export interface Transaction {
  id: number;
  description: string;
  value: number;
  type: 'despesa' | 'receita';
  userId: number;
}

export type TabId = 'totais' | 'usuarios' | 'transacoes';

export interface Tab {
  id: TabId;
  label: string;
  icon: string;
}