import { api } from './api';
import type { Transaction } from '../types';

// Map API response 
const mapTransaction = (transaction: any): Transaction => ({
  id: transaction.id,
  description: transaction.description,
  value: transaction.value,
  type: transaction.type, 
  userId: transaction.userId
});

export const transactionService = {
  // GET /transactions
  getTransactions: () => 
    api.get<any[]>('/transactions').then(data => data.map(mapTransaction)),
  
  // GET /transactions filter
  getTransactionsFiltered: (userId?: number, type?: 'Receita' | 'Despesa') => {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId.toString());
    if (type) params.append('type', type);
    
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return api.get<any[]>(`/transactions${queryString}`).then(data => data.map(mapTransaction));
  },
  
  // GET /transactions/{id}
  getTransactionById: (id: number) => 
    api.get<any>(`/transactions/${id}`).then(mapTransaction),
  
  // POST /transactions 
  createTransaction: (data: Omit<Transaction, 'id'>) => {
    return api.post<any>('/transactions', data).then(mapTransaction);
  },
};