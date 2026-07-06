import type { User } from '../types';

const MOCK_USERS: User[] = [
  { id: 1, fullName: 'Ana Silva', age: 28 },
  { id: 2, fullName: 'Carlos Santos', age: 34 },
  { id: 3, fullName: 'Mariana Oliveira', age: 25 },
  { id: 4, fullName: 'João Pereira', age: 42 },
  { id: 5, fullName: 'Fernanda Costa', age: 31 },
  { id: 6, fullName: 'Danilo Jumento', age: 17 }
];

export const userService = {
  getUsers(): User[] {
    return MOCK_USERS;
  },

  getUserById(id: number): User | undefined {
    return MOCK_USERS.find(user => user.id === id);
  },

  createUser(userData: Omit<User, 'id'>): User {
    const newUser = {
      ...userData,
      id: MOCK_USERS.length + 1
    };
    MOCK_USERS.push(newUser);
    return newUser;
  }
};