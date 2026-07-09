import { useState } from 'react';
import type { User } from '../../../../types';

interface UseTransactionFormProps {
  users: User[];
  onSubmit: (data: {
    description: string;
    value: number;
    type: 'Receita' | 'Despesa';  
    userId: number;
  }) => void;
}

export function useTransactionForm({ users, onSubmit }: UseTransactionFormProps) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<'Receita' | 'Despesa'>('Despesa');  // Changed to uppercase
  const [usuarioId, setUsuarioId] = useState<number>(() => {
    return Array.isArray(users) && users.length > 0 ? users[0].id : 0;
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const userArray = Array.isArray(users) ? users : [];
  const selectedUser = userArray.find(u => u.id === usuarioId);
  const isUnder18 = selectedUser ? selectedUser.age < 18 : false;

  const validateForm = () => {
    if (!descricao.trim()) {
      alert('Por favor, preencha a descrição.');
      return false;
    }

    const valorNum = parseFloat(valor.replace(',', '.'));
    if (isNaN(valorNum) || valorNum <= 0) {
      alert('Por favor, insira um valor válido.');
      return false;
    }

    if (!usuarioId || usuarioId === 0) {
      alert('Por favor, selecione um usuário.');
      return false;
    }

    if (isUnder18 && tipo === 'Receita') {  // Changed to uppercase
      alert('Usuários menores de 18 anos só podem registrar despesas.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const valorNum = parseFloat(valor.replace(',', '.'));
    
    onSubmit({
      description: descricao.trim(),
      value: valorNum,
      type: tipo,
      userId: usuarioId
    });

    setShowSuccess(true);
    resetForm();

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const resetForm = () => {
    setDescricao('');
    setValor('');
    setTipo('Despesa');  // Changed to uppercase
    setUsuarioId(Array.isArray(users) && users.length > 0 ? users[0].id : 0);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = Number(e.target.value);
    setUsuarioId(userId);
    
    const user = userArray.find(u => u.id === userId);
    if (user && user.age < 18) {
      setTipo('Despesa');  // Changed to uppercase
    }
  };

  return {
    descricao,
    valor,
    tipo,
    usuarioId,
    showSuccess,
    isUnder18,
    selectedUser,
    setDescricao,
    setValor,
    setTipo,
    handleSubmit,
    handleUserChange,
    resetForm
  };
}