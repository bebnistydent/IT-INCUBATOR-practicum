import {Button} from './Button'
import {ChangeEvent, useState, KeyboardEvent} from "react";
import {Props} from './Types.ts';



export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask}: Props) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string|null>(null);
    const isValid = newTaskTitle.trim().length > 0 && newTaskTitle.trim().length <= 15

    const createTaskHandler = () => {
        const trimmedTitle = newTaskTitle.trim()

        if(trimmedTitle.length === 0) {
            setError("Task name cannot be empty")
            return
        }

        if(trimmedTitle.length > 15) {
            setError("Task name too long")
            return
        }


        createTask(trimmedTitle)
        setNewTaskTitle("")
        setError(null)
    }
    const createTasksOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        setNewTaskTitle(value)

        if(error){
            setError(null)
        }
    }
    return (
      <div>
        <h3>{title}</h3>
        <div>
          <input value = {newTaskTitle}
                 onChange={onChangeHandler}
                 onKeyDown={createTasksOnEnterHandler}
          />

          <Button title={'+'}  onClickHandler = {createTaskHandler} disabled={!isValid}/>

        </div>
          {error && (
              <div className="error-message">
                  {error}
              </div>
          )}
        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <ul>
              {tasks.map(task => {
                return (
                    <li key={task.id}>
                      <input type="checkbox" checked={task.isDone}
                             onChange={event => setNewTaskTitle(event.currentTarget.value)}
                             onKeyDown = {event => {
                              if(event.key === "Enter") {
                                  createTaskHandler()
                              }

                          }}/>
                      <span>{task.title}</span>
                      <Button title={'x'} onClickHandler={() => deleteTask(task.id)} />
                    </li>
                )
              })}
            </ul>
        )}
        <div>
          <Button title={'All'} onClickHandler={() => changeFilter('all')}/>
          <Button title={'Active'} onClickHandler={() => changeFilter('active')}/>
          <Button title={'Completed'} onClickHandler={() => changeFilter('completed')}/>
        </div>
      </div>
  )
}
