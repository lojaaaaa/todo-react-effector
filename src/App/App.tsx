import { FC } from 'react'
import {TodoList} from '../components/TodoLIst/TodoList'
import {TodoAdd} from '../components/TodoAdd/TodoAdd';

interface Props  {}

export const App: FC<Props> = () => {
  return (
    <div className="App">
      <TodoAdd />
      <TodoList />
    </div>
  )
}
