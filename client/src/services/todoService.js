import axios from 'axios';

const API_URL = 'http://localhost:5000/service/todo';

export const todoService = {
  // Get all todos
  getAllTodos: async () => {
    try {
      const response = await axios.get(`${API_URL}/get_all`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch todos';
    }
  },

  // Add a new todo
  addTodo: async (todoData) => {
    try {
      const response = await axios.post(`${API_URL}/add_todo`, todoData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to add todo';
    }
  },

  // Update a todo
  updateTodo: async (id, todoData) => {
    try {
      const response = await axios.patch(`${API_URL}/update_todo/${id}`, todoData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update todo';
    }
  },

  // Delete a todo
  deleteTodo: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete_todo/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete todo';
    }
  }
}; 