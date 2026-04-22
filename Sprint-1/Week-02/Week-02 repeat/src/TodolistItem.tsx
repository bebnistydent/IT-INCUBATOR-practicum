import type {Task} from './App'
import {Button} from './Button'
import {FilteredValueTypes} from "./Types.ts";

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskID: Task["id"]) => void
    filteredTasks: (newFilter: FilteredValueTypes) => void
}

export const TodolistItem = ({title, tasks, deleteTask, filteredTasks}: Props) => {
  return (
      <div>
        <h3>{title}</h3>
        <div>
          <input/>
          <Button title={'+'} onClickHandler={()=> {}}/>
        </div>
        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <ul>
              {tasks.map(task => {
                return (
                    <li key={task.id}>
                      <input type="checkbox" checked={task.isDone} />
                      <span>{task.title}</span>
                        <Button title={"-"} onClickHandler={()=> deleteTask(task.id)} />
                    </li>
                )
              })}
            </ul>
        )}
        <div>
          <Button title={'All'} onClickHandler={()=> filteredTasks('all')}/>
          <Button title={'Active'} onClickHandler={()=> filteredTasks('active')}/>
          <Button title={'Completed'} onClickHandler={()=> filteredTasks('completed')}/>
        </div>
      </div>
  )
}
