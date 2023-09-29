import { ITodo } from "../types/types";

export const addTodosToLocalStorage = (todos: ITodo[]): void => {
  if(todos) localStorage.setItem('todos', JSON.stringify(todos))
}