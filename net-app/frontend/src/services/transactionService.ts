import type { Transaction } from '../types';

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 1, description: 'Compra de material de escritório', value: 450.75, type: 'despesa', userId: 1 },
  { id: 2, description: 'Venda de licença de software', value: 3200.00, type: 'receita', userId: 2 },
  { id: 3, description: 'Pagamento de aluguel', value: 2200.00, type: 'despesa', userId: 3 },
  { id: 4, description: 'Consultoria de TI', value: 1800.00, type: 'receita', userId: 1 },
  { id: 5, description: 'Compra de equipamentos', value: 3500.50, type: 'despesa', userId: 4 },
  { id: 6, description: 'Assinatura de serviço cloud', value: 890.00, type: 'despesa', userId: 2 },
  { id: 7, description: 'Treinamento de equipe', value: 1500.00, type: 'despesa', userId: 5 },
  { id: 8, description: 'Venda de solução personalizada', value: 7500.00, type: 'receita', userId: 3 },
  { id: 9, description: 'Manutenção de sistemas', value: 1250.00, type: 'despesa', userId: 1 },
  { id: 10, description: 'Licenciamento de software', value: 2100.00, type: 'receita', userId: 4 },
  { id: 11, description: 'Compra de notebooks', value: 5200.00, type: 'despesa', userId: 2 },
  { id: 12, description: 'Serviços de hospedagem', value: 340.50, type: 'despesa', userId: 5 },
  { id: 13, description: 'Desenvolvimento de app', value: 12000.00, type: 'receita', userId: 1 },
  { id: 14, description: 'Material de divulgação', value: 780.00, type: 'despesa', userId: 3 },
  { id: 15, description: 'Suporte técnico anual', value: 4500.00, type: 'receita', userId: 2 },
  { id: 16, description: 'Compra de servidores', value: 8500.00, type: 'despesa', userId: 4 },
  { id: 17, description: 'Consultoria em segurança', value: 3200.00, type: 'receita', userId: 2 },
  { id: 18, description: 'Despesas de viagem', value: 1560.00, type: 'despesa', userId: 1 },
  { id: 19, description: 'Assinatura de ferramentas', value: 420.00, type: 'despesa', userId: 3 },
  { id: 20, description: 'Venda de módulo adicional', value: 6800.00, type: 'receita', userId: 3 }
];

export const transactionService = {
  getTransactions(): Transaction[] {
    return MOCK_TRANSACTIONS;
  },

  getTransactionsByUser(userId: number): Transaction[] {
    return MOCK_TRANSACTIONS.filter(t => t.userId === userId);
  },

  createTransaction(transactionData: Omit<Transaction, 'id'>): Transaction {
    const newTransaction = {
      ...transactionData,
      id: MOCK_TRANSACTIONS.length + 1
    };
    MOCK_TRANSACTIONS.push(newTransaction);
    return newTransaction;
  },

  getSummary(): { totalReceitas: number; totalDespesas: number; saldoTotal: number } {
    const totalReceitas = MOCK_TRANSACTIONS
      .filter(t => t.type === 'receita')
      .reduce((sum, t) => sum + t.value, 0);
    
    const totalDespesas = MOCK_TRANSACTIONS
      .filter(t => t.type === 'despesa')
      .reduce((sum, t) => sum + t.value, 0);
    
    return {
      totalReceitas,
      totalDespesas,
      saldoTotal: totalReceitas - totalDespesas
    };
  }
};