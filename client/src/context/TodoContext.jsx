import React, { createContext, useContext, useState, useEffect } from 'react';
import { todoService } from '../services/todoService';
import toast from 'react-hot-toast';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await todoService.getAllTodos();
      setTasks(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todoData) => {
    try {
      const response = await todoService.addTodo(todoData);
      setTasks(prevTasks => [...prevTasks, response.newTodo]);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      const response = await todoService.updateTodo(id, todoData);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === id ? response.updatedTodo : task
        )
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TodoContext.Provider value={{ 
      tasks, 
      loading, 
      addTodo, 
      updateTodo, 
      deleteTodo,
      refreshTasks: fetchTasks 
    }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}; 