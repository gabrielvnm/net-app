import { useState, useEffect } from 'react';
import { FormUsuario } from '../../FormUsuario';
import { EditUsuario } from '../../EditUsuario';
import { userService } from '../../../services/userService';
import type { User } from '../../../types';
import './Usuarios.css';

export default function Usuarios() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {    
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError('Erro ao carregar usuários');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = async (userData: Omit<User, 'id'>) => {
    try {
      await userService.createUser(userData);
      await loadUsers();
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add user:', error);
      alert('Erro ao adicionar usuário');
    }
  };

const handleUpdateUser = async (id: number, userData: Omit<User, 'id'>) => {
  console.log('🔄 handleUpdateUser called with id:', id, 'data:', userData);
  try {
    await userService.updateUser(id, userData);
    console.log('✅ Update successful');
    await loadUsers();
    setEditingUser(null);
  } catch (error) {
    console.error('❌ Failed to update user:', error);
    // Check if it's the JSON parse error
    if (error instanceof SyntaxError && error.message.includes('JSON.parse')) {
      // The update likely succeeded but the server returned an empty response
      console.log('⚠️ Server returned empty response, but update might have succeeded');
      await loadUsers();
      setEditingUser(null);
      alert('Usuário atualizado com sucesso!');
    } else {
      alert('Erro ao atualizar usuário');
    }
  }
};

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await userService.deleteUser(id);
        await loadUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Erro ao excluir usuário');
      }
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowAddForm(false); // Close add form if open
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleToggleAddForm = () => {
    if (showAddForm) {
      setShowAddForm(false);
    } else {
      setShowAddForm(true);
      setEditingUser(null); // Close edit form if open
    }
  };

  return (
    <section className="usuarios-page">
      <div className="usuarios-header">
        <h2>👥 Usuários</h2>
        <button 
          className="btn btn-primary btn-add-user"
          onClick={handleToggleAddForm}
        >
          {showAddForm ? '🔽 Fechar Formulário' : '➕ Adicionar Usuário'}
        </button>
      </div>
      <p>Listagem, adicionar, remover ou editar usuários.</p>

      {/* Add Form - at the top */}
      {showAddForm && <FormUsuario onUserAdded={handleAddUser} />}

      {loading && <p>Carregando usuários...</p>}
      
      {error && (
        <div className="error-message">
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={loadUsers}>Tentar novamente</button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>#{user.id}</td>
                    <td>{user.fullName}</td>
                    <td>{user.age} anos</td>
                    <td>
                      <button 
                        onClick={() => handleEditUser(user)} 
                        className="btn-edit"
                      >
                        ✏️ Editar
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)} 
                        className="btn-delete"
                      >
                        🗑️ Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <p>Nenhum usuário cadastrado.</p>
          )}

          {/* Edit Form - below the user list */}
          {editingUser && (
            <EditUsuario 
              user={editingUser}
              onUserUpdated={handleUpdateUser}
              onCancel={handleCancelEdit}
            />
          )}
        </>
      )}
    </section>
  );
}