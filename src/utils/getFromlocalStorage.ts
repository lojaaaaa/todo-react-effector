import { ITodo } from "../types/types";

export const getTodosFromLocalStorage = (): ITodo[] => {
  const data = localStorage.getItem('todos');
  return data ? JSON.parse(data) : [];
}