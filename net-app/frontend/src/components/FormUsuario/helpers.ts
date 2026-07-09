export const validateUserForm = (nome: string, dataNascimento: string): string | null => {
  if (!nome.trim()) {
    return 'Por favor, preencha o nome.';
  }
  if (!dataNascimento) {
    return 'Por favor, selecione uma data de nascimento.';
  }
  const birthDate = new Date(dataNascimento);
  if (birthDate > new Date()) {
    return 'A data de nascimento não pode ser no futuro.';
  }
  return null;
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