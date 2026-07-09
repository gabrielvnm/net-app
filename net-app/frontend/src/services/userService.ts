import { api } from './api';
import type { User } from '../types';

// mapa dos modelos backend para o front
const mapUser = (user: any): User => ({
  id: user.id,
  fullName: user.name,
  age: user.age
});

export const userService = {
  // GET /users
  getUsers: () => api.get<any[]>('/users').then(data => data.map(mapUser)),
  
  // GET /users/{id}
  getUserById: (id: number) => api.get<any>(`/users/${id}`).then(mapUser),
  
  // POST /users 
  createUser: (userData: Omit<User, 'id'>) => 
    api.post<any>('/users', { name: userData.fullName, age: userData.age }).then(mapUser),
  
  // PATCH user
  updateUser: (id: number, userData: Omit<User, 'id'>) =>
    api.patch<any>(`/users/${id}`, { name: userData.fullName, age: userData.age })
      .then(data => {
        if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
          return {
            id,
            ...userData
          } as User;
        }
        return mapUser(data);
      }),
  
  // DELETE /users/{id}
  deleteUser: (id: number) => api.delete(`/users/${id}`),
};