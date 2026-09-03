import {TodolistTitle} from './TodolistTitle/TodolistTitle.tsx'
import {Tasks} from './Tasks/Tasks.tsx'
import {Todolist} from "@/features/todolists/model/todolists-reducer.ts"
import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx";

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({ todolist }: Props) => {
  return (
      <div>
        <TodolistTitle todolist={todolist} />
        <Tasks todolist={todolist} />
        <FilterButtons todolist={todolist}/>
      </div>
  )
}