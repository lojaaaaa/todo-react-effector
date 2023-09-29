import { createEffect, createEvent, createStore, sample } from "effector";
import { ITodo } from "../types/types";
import { getTodosFromLocalStorage } from "../utils/getFromlocalStorage";
import { addTodosToLocalStorage } from "../utils/addTodosToLocalStorage";

// events
const addTodo = createEvent<ITodo>()
const removeTodo = createEvent<number>()
const toggleStatus = createEvent<number>()
const resetAllTodo = createEvent()


// reducers
const addTodoReducer = (todos: ITodo[], newTodo: ITodo): ITodo[] => {
  const newTodos = [...todos, newTodo]
  addTodosToLocalStorage(newTodos)

  return newTodos;
}

const removeTodoReducer = (todos: ITodo[], id: number): ITodo[] => {
  const newTodos = todos.filter((todo) => id !== todo.id)
  addTodosToLocalStorage(newTodos)

  return newTodos;
}

const toggleStatusReducer = (todos: ITodo[], id: number): ITodo[] =>{
  const newTodos = todos.map((todo) =>
    id === todo.id 
    ? { ...todo, completed: !todo.completed } 
    : todo
  )
  addTodosToLocalStorage(newTodos)

  return newTodos
}

const removeAllTodosReducer = (): ITodo[] => {
  addTodosToLocalStorage([])
  return [];
}

const getTodosReducer = (todos:ITodo[], payload: ITodo[]) => {
  const newTodos = [...todos, ...payload.map(el => 
    ({ 
      id: el.id, 
      title: el.title, 
      completed: el.completed 
    }))]
  addTodosToLocalStorage(newTodos)

  return newTodos

}



// effects
const getTodosFx = createEffect(async (url: string) => {
  try{
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 3000);
    })

    const req = await fetch(url)
    const data = await req.json()
    if (!req.ok) {
      throw new Error('Запрос завершился с ошибкой: ' + data.message);
    }
    return data
  }
  catch(error){
    return error
  }

})



// store
const $todos = createStore<ITodo[]>(getTodosFromLocalStorage())
  // .on(
  //   getTodosFx.doneData,
  //   (todos, payload) => getTodosReducer(todos, payload)
  // )
  // .on(
  //   addTodo, 
  //   (todos, newTodo) => addTodoReducer(todos, newTodo)
  // )
  // .on(
  //   removeTodo, 
  //   (todos, id) => removeTodoReducer(todos, id)
  // )
  // .on(
  //   toggleStatus, 
  //   (todos, id) => toggleStatusReducer(todos, id)
  // )
  // .on(
  //   resetAllTodo, 
  //   () => removeAllTodosReducer()
  // )



sample({
  clock: getTodosFx.doneData,
  source: $todos,
  fn: (todos: ITodo[], payload: ITodo[]) => getTodosReducer(todos, payload),
  target: $todos,
})

sample({
  clock: addTodo,
  source: $todos,
  fn: (todos: ITodo[], newTodo: ITodo) => addTodoReducer(todos, newTodo),
  target: $todos,
})

sample({
  clock: removeTodo,
  source: $todos,
  fn: (todos: ITodo[], id: number) => removeTodoReducer(todos, id),
  target: $todos,
})

sample({
  clock: toggleStatus,
  source: $todos,
  fn: (todos: ITodo[], id: number) => toggleStatusReducer(todos, id),
  target: $todos,
})


sample({
  clock: resetAllTodo,
  source: $todos,
  fn: () => removeAllTodosReducer(),
  target: $todos,
})

  getTodosFx.pending.watch(() => {
    console.log('Ожидание')
  })

  getTodosFx.done.watch(({result}) => {
    console.log('завершён со значением', result)
  })


  getTodosFx.fail.watch(({ error }) => {
    console.log('завершился с ошибкой', error.message);
  })
  

  export {$todos, toggleStatus, removeTodo, addTodo, getTodosFx, resetAllTodo }

