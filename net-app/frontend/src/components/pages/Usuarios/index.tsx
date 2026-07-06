import { useState, useEffect } from 'react';
import { FormUsuario } from '../../FormUsuario';
import { userService } from '../../../services/userService';
import type { User } from '../../../types';
import './Usuarios.css';

export default function Usuarios() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  // Load users from service
  const loadUsers = () => {
    setUsers(userService.getUsers());
  };

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Handle new user creation
  const handleAddUser = (userData: Omit<User, 'id'>) => {
    userService.createUser(userData);
    loadUsers(); // Refresh the list
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

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td>{user.fullName}</td>
                <td>{user.age} anos</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}