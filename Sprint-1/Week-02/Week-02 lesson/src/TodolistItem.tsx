import {FilterValuesType, TaskType} from './Types.ts'
import {Button} from './Button'

type Props = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType["id"]) => void
    changeTodolistFilter: (filter: FilterValuesType) => void
}

export const TodolistItem = (props: Props) => {
  const {
      title,
      tasks,
      deleteTask,
      changeTodolistFilter,
        } = props

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
          <Button title={'All'} onClickHandler={() => changeTodolistFilter('all')}/>
          <Button title={'Active'} onClickHandler={() => changeTodolistFilter('active')}/>
          <Button title={'Completed'} onClickHandler={() => changeTodolistFilter('completed')}/>
        </div>
      </div>
  )
}
