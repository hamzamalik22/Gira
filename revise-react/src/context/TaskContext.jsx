import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedTasks = localStorage.getItem(`tasks_${user.id}`);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, [user]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`tasks_${user.id}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const createTask = (taskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      ...taskData,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      status: taskData.status || 'to-do',
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (taskId, updates) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const getTasksByProject = (projectId) => {
    return tasks.filter((task) => task.projectId === projectId);
  };

  const getTasksByStatus = (projectId, status) => {
    return tasks.filter((task) => 
      task.projectId === projectId && task.status === status
    );
  };

  // Methods for personal tasks (todos)
  const getPersonalTasks = () => {
    return tasks.filter((task) => !task.projectId);
  };

  const getPersonalTasksByStatus = (status) => {
    return tasks.filter((task) => !task.projectId && task.status === status);
  };

  const moveTask = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const getTaskById = (taskId) => {
    return tasks.find((task) => task.id === taskId);
  };

  const value = {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    getTasksByProject,
    getTasksByStatus,
    getPersonalTasks,
    getPersonalTasksByStatus,
    moveTask,
    getTaskById,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}; 