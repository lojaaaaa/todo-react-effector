import { FC } from 'react'
import {TodoList} from '../components/TodoLIst/TodoList'
import {TodoAdd} from '../components/TodoAdd/TodoAdd';
import { getTodosFx, resetAllTodo } from '../store/store';
import { useStore } from 'effector-react';

interface Props  {}

export const App: FC<Props> = () => {
  const loading = useStore(getTodosFx.pending)

  return (
    <div className="App">
      <TodoAdd />
      <button className='button' onClick={() => getTodosFx('https://jsonplaceholder.typicode.com/todos')}>Получить todo</button>
      <button className='button' onClick={() => resetAllTodo()}>Удалить все todo</button>
      {loading ? <p>Загрузка...</p> : null}
      <TodoList />
    </div>
  )
}
