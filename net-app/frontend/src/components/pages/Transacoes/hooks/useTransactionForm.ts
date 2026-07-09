import { useState, useEffect } from 'react';
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

const calculateAge = (dateOfBirth: string): number => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export function useTransactionForm({ users, onSubmit }: UseTransactionFormProps) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<'Receita' | 'Despesa'>('Despesa');
  const [usuarioId, setUsuarioId] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Update usuarioId when users array changes
  useEffect(() => {
    const userArray = Array.isArray(users) ? users : [];
    if (userArray.length > 0) {
      const currentUserExists = userArray.some(u => u.id === usuarioId);
      if (!currentUserExists || usuarioId === 0) {
        setUsuarioId(userArray[0].id);
      }
    } else {
      setUsuarioId(0);
    }
  }, [users, usuarioId]);

  const userArray = Array.isArray(users) ? users : [];
  const selectedUser = userArray.find(u => u.id === usuarioId);
  
  // Calculate age from dateOfBirth
  const isUnder18 = selectedUser ? calculateAge(selectedUser.dateOfBirth) < 18 : false;

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

    if (isUnder18 && tipo === 'Receita') {
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
    setTipo('Despesa');
    setUsuarioId(Array.isArray(users) && users.length > 0 ? users[0].id : 0);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = Number(e.target.value);
    setUsuarioId(userId);
    
    const user = userArray.find(u => u.id === userId);
    if (user && calculateAge(user.dateOfBirth) < 18) {
      setTipo('Despesa');
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