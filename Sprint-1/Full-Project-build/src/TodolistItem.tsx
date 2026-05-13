import {FilteredValueType, Task} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, useState} from "react";

type TodolistItemPropsType = {
    title: string
    tasks: Task[]
    deleteTasks: (taskId: Task['id']) => any
    changeFilter: (newFilter: FilteredValueType) => void
    createTask: (title: Task['title']) => void
    changeTaskStatus: (taskID: Task['id'], isDone: Task['isDone']) => void
    filter: FilteredValueType
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTasks,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus,
                                 filter
                             }:TodolistItemPropsType ) => {
    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const createTasksHandler = () => {
        const trimmedTasks = taskTitle.trim()
        if(trimmedTasks !== "" ) {
        createTask(trimmedTasks)
        setTaskTitle('')
        } else {
            setError("Task can't be empty")
        }

    }

    const setStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        setTaskTitle(value)
        setError(null)

        if(value.length === 30) {
          setError("Title can't be longer than 30 characters")
        }
    }


    return (
    <div>
        <h3>{title}</h3>
        <div>
            <input value = {taskTitle}
                   maxLength={30}
                   className={error ? 'error' : ''}
                   onChange = {setStatusHandler}
                   onKeyDown={event => event.key === "Enter" ? createTasksHandler() : undefined}
            />

            <Button title={"+"} onClickHandler={createTasksHandler}/>
            {error && <div className={"error-message"}>{error}</div>}

        </div>

        {tasks.length === 0 ? <>No tasks</> : (
            <ul>
                {tasks.map(task => {
                    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        const changeStatusValue= event.currentTarget.checked
                        changeTaskStatus(task.id, changeStatusValue)
                        }

                        return(
                    <li key = {task.id} className={task.isDone ? 'isDone' : ''}>
                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <span>{task.title}</span>
                        <Button title={"X"} onClickHandler={() => deleteTasks(task.id)}/>
                    </li>
                    )
                }
                )}

            </ul>
        )}

        <div>
            <Button
                className = {filter === "all" ? "active-filter" : ''}
                title={"All"}
                onClickHandler={()=> changeFilter('all')}/>
            <Button
                className = {filter === "active" ? "active-filter" : ''}
                title={"Active"}
                onClickHandler={()=> changeFilter('active')}/>
            <Button
                className = {filter === "completed" ? "active-filter" : ''}
                title={"Completed"}
                onClickHandler={()=> changeFilter('completed')}/>
        </div>
    </div>
    )
}
