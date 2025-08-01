import axios from 'axios';
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  // Get all todos
  async getTodos(): Promise<Todo[]> {
    const response = await api.get('/todos');
    return response.data;
  },

  // Create a new todo
  async createTodo(todo: CreateTodoRequest): Promise<Todo> {
    const response = await api.post('/todos', todo);
    return response.data;
  },

  // Update a todo
  async updateTodo(id: number, updates: UpdateTodoRequest): Promise<Todo> {
    const response = await api.put(`/todos/${id}`, updates);
    return response.data;
  },

  // Delete a todo
  async deleteTodo(id: number): Promise<void> {
    await api.delete(`/todos/${id}`);
  },

  // Toggle todo completion
  async toggleTodo(id: number, completed: boolean): Promise<Todo> {
    return this.updateTodo(id, { completed });
  }
}; 