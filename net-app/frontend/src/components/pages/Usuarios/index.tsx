import { useState, useEffect } from 'react';
import { FormUsuario } from '../../FormUsuario';
import { userService } from '../../../services/userService';
import type { User } from '../../../types';
import './Usuarios.css';

export default function Usuarios() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getUsers(); // chamada de api GET
      setUsers(data);
      console.log('📋 Users loaded:', data);
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
      await userService.createUser(userData); // chamada API CREATE
      await loadUsers();
    } catch (error) {
      console.error('Failed to add user:', error);
      alert('Erro ao adicionar usuário');
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await userService.deleteUser(id); // chamada api DELETE
        await loadUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Erro ao excluir usuário');
      }
    }
  };

  return (
    <section className="usuarios-page">
      <div className="usuarios-header">
        <h2>👥 Usuários</h2>
        <button 
          className="btn btn-primary btn-add-user"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '🔽 Fechar Formulário' : '➕ Adicionar Usuário'}
        </button>
      </div>
      <p>Listagem, adicionar, remover ou editar usuários.</p>

      {showForm && <FormUsuario onUserAdded={handleAddUser} />}

      {loading && <p>Carregando usuários...</p>}
      
      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={loadUsers}>Tentar novamente</button>
        </div>
      )}

      {!loading && !error && (
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
                    <button onClick={() => handleDeleteUser(user.id)}>
                      🗑️ Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <p>Nenhum usuário cadastrado.</p>
      )}
    </section>
  );
}