import { FC } from 'react'
import {TodoItem} from '../TodoItem/TodoItem'
import style from './TodoList.module.scss'
import { useStore } from 'effector-react'
import { $todos } from '../../store/store'

interface Props{}

export const TodoList: FC<Props>  = () => {
  const todos = useStore($todos)

  return (
    <div className={style.content}>

      {
        todos.length > 0
        ? todos.map(todo => 
          <TodoItem 
            key={todo.id + Math.random()} 
            id={todo.id} 
            title={todo.title} 
            completed={todo.completed}
          />)
        : <p className='title'>Здесь пусто</p>
      }
      
    </div>
  )
}
