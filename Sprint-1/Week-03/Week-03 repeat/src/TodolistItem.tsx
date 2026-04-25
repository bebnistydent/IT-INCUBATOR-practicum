import {Button} from './Button'
import {useState} from "react";
import {Props} from './Types.ts';



export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask}: Props) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const createTaskHandler = () => {
        createTask(newTaskTitle)
        setNewTaskTitle("")
    }
    return (
      <div>
        <h3>{title}</h3>
        <div>
          <input value = {newTaskTitle}
                 onChange={event => setNewTaskTitle(event.currentTarget.value)}
                 onKeyDown={event => event.key === "Enter" ? createTaskHandler() : undefined}
          />

          <Button title={'+'}  onClickHandler = {createTaskHandler} />

        </div>
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
