import { api } from './api';
import type { User } from '../types';

const mapUser = (user: any): User => ({
  id: user.id,
  fullName: user.name,
  age: user.age
});
// endpoints de usuario
export const userService = {
  getUsers: () => api.get<any[]>('/users').then(data => data.map(mapUser)),
  
  getUserById: (id: number) => api.get<any>(`/users/${id}`).then(mapUser),
  
  createUser: (userData: Omit<User, 'id'>) => 
    api.post<any>('/users', { name: userData.fullName, age: userData.age }).then(mapUser),
  
  updateUser: (id: number, userData: Omit<User, 'id'>) =>
    api.put<any>(`/users/${id}`, { name: userData.fullName, age: userData.age }).then(mapUser),
  
  deleteUser: (id: number) => api.delete(`/users/${id}`),
};