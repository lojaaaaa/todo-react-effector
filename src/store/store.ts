import { createEffect, createEvent, createStore } from "effector";
import { ITodo } from "../types/types";
import { getTodosFromLocalStorage } from "../utils/getFromlocalStorage";

const addTodoReducer = (todos: ITodo[], newTodo: ITodo): ITodo[] => {
  return [...todos, newTodo];
}

const removeTodoReducer = (todos: ITodo[], id: number): ITodo[] => {
  return todos.filter((todo) => id !== todo.id);
}

const toggleStatusReducer = (todos: ITodo[], id: number): ITodo[] =>{
  return todos.map((todo) =>
    id === todo.id ? { ...todo, done: !todo.done } : todo
  )
}

const saveStorage = createEffect((todos: ITodo[])  => {
  localStorage.setItem('todos', JSON.stringify(todos))
})


const addTodo = createEvent<ITodo>()
const removeTodo = createEvent<number>()
const toggleStatus = createEvent<number>()

const $todos = createStore<ITodo[]>(getTodosFromLocalStorage())
  .on(
    addTodo, 
    (todos, newTodo) => addTodoReducer(todos, newTodo)
  )
  .on(
    removeTodo, 
    (todos, id) => removeTodoReducer(todos, id)
  )
  .on(
    toggleStatus, 
    (todos, id) => toggleStatusReducer(todos, id)
  )

  $todos.watch((todos) => {
    saveStorage(todos); 
  })


  export {$todos, toggleStatus, removeTodo, addTodo }

