import { FC } from 'react'
import style from './TodoItem.module.scss'
import { ITodo } from './../../types/types';
import { removeTodo, toggleStatus } from '../../store/store';

export const TodoItem: FC<ITodo> = ({text, id, done}) => {
  
  const onClickRemove = () =>{
    removeTodo(id)
  }
  const onClickToggle = () =>{
    toggleStatus(id)
  }
  const itemClassName = done ? `${style.item} ${style.clicked}` : style.item
  const textCLassName = done ? `${style.text} ${style.clickedText}` : style.text

  return (
    <div className={itemClassName}>
      <p className={textCLassName}>{text}</p>
      <div className={style.buttons}>
        <button onClick={onClickToggle} className={style.button} >✓</button>
        <button onClick={onClickRemove} className={style.button} >×</button>
      </div>
    </div>
  )
}
