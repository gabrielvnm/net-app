// frontend/src/services/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5071';

export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }
    return response.json();
  },

  // ADD PATCH METHOD
  async patch<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }
    
    // Handle empty response (like 204 No Content)
    const contentLength = response.headers.get('content-length');
    const contentType = response.headers.get('content-type');
    
    if (contentLength === '0' || !contentType?.includes('application/json')) {
      return {} as T;
    }
    
    const text = await response.text();
    if (!text || text.trim() === '') {
      return {} as T;
    }
    return JSON.parse(text);
  },

  // Keep PUT for backward compatibility, but mark as deprecated
  async put<T>(endpoint: string, data: any): Promise<T> {
    console.warn('⚠️ PUT method is deprecated, use PATCH instead');
    return this.patch<T>(endpoint, data);
  },

  async delete(endpoint: string): Promise<void> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }
  },
};