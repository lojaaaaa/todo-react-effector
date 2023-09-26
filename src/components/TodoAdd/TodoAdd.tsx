import { FC, useState } from 'react'
import style from './TodoAdd.module.scss'
import plus from './../../assets/btn-add.svg'
import { $todos, addTodo } from '../../store/store'
import { useStore } from 'effector-react'

interface Props{}

export const TodoAdd: FC<Props> = () => {

  const [input, setInput] = useState<string>('')
  const todos = useStore($todos)

  const handleClick = () =>{
    input 
      ? addTodo({ id: todos.length, text: input, done: false}) 
      : null
    setInput('')
  }

  return (
    <form 
      className={style.form} 
      onSubmit={event => event.preventDefault()}>
      <input 
        value={input}
        onChange={e => setInput(e.target.value)}
        type="text" 
        className={style.input} 
        placeholder='Введите текст'
      />
      <button onClick={handleClick} className={style.btn}>
        <img src={plus} alt="add"/>
      </button>
  </form>
  )
}
