import {Task} from '../types';
  
  const STORAGE_KEY = "tasks";
  
  export const getTasks = (): Task[] => {
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  };
  
  export const addTask = (task: Task): void => {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  };
  
  export const updateTask = (taskId: string, updatedData: Partial<Task>): void => {
    const tasks = getTasks().map(task => 
      task.id === taskId ? { ...task, ...updatedData } : task
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  };
  
  export const deleteTask = (taskId: string): void => {
    const tasks = getTasks().filter(task => task.id !== taskId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  };
  