import type {TaskType} from './Types.ts'
import {Button} from './Button'

type Props = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType["id"]) => void
}

export const TodolistItem = ({title, tasks, deleteTask}: Props) => {
  return (
      <div>
        <h3>{title}</h3>
        <div>
          <input/>
          <Button title={'+'}/>
        </div>
        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <ul>
              {tasks.map(task => {
                  const deleteTaskHandler = ()=> deleteTask(task.id)
                return (
                    <li key={task.id}>
                      <input type="checkbox" checked={task.isDone} />
                      <span>{task.title}</span>
                        <Button title={"-"} onClickHandler = {deleteTaskHandler}/>
                    </li>
                )
              })}
            </ul>
        )}
        <div>
          <Button title={'All'} />
          <Button title={'Active'} />
          <Button title={'Completed'} />
        </div>
      </div>
  )
}
