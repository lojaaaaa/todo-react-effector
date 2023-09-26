import { createEvent, createStore } from "effector";
import { ITodo } from "../types/types";

export const addTodo = createEvent<ITodo>()
export const removeTodo = createEvent<number>()
export const toggleStatus = createEvent<number>()

export const $todos = createStore<ITodo[]>([])
  .on(
    addTodo, 
    (todos, newTodo) => [...todos, newTodo]
  )
  .on(
    removeTodo, 
    (todos, id) => todos.filter(todo => id !== todo.id)
  )
  .on(
    toggleStatus, 
    (todos, id) => 
      todos.map(
        todo => id === todo.id 
        ? {...todo, done: !todo.done} 
        : todo
      )
  )



