import type { User } from '../../types';

export const calculateAge = (birthDateStr: string): number => {
  const birthDate = new Date(birthDateStr);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const validateUserForm = (nome: string, dataNascimento: string): string | null => {
  if (!nome.trim()) {
    return 'Por favor, preencha o nome.';
  }
  if (!dataNascimento) {
    return 'Por favor, selecione uma data de nascimento.';
  }
  return null;
};

export const formatUserData = (nome: string, dataNascimento: string): Omit<User, 'id'> => {
  const age = calculateAge(dataNascimento);
  return {
    fullName: nome.trim(),
    age: age
  };
};

export const getInitialFormState = () => ({
  nome: '',
  dataNascimento: '',
});

export const getFormTitle = (isEditing: boolean = false) => ({
  title: isEditing ? '✏️ Editar Usuário' : '➕ Adicionar Novo Usuário',
  subtitle: isEditing 
    ? 'Atualize os dados do usuário' 
    : 'Preencha os dados abaixo para cadastrar um novo usuário',
  successMessage: isEditing ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!',
  successDetail: isEditing ? 'atualizado' : 'adicionado',
  submitButtonText: isEditing ? '💾 Atualizar Usuário' : '💾 Salvar Usuário',
  cancelButtonText: isEditing ? '❌ Cancelar' : '🗑️ Limpar Campos',
});