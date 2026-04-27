import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValuesType } from "./App"
import { Button } from "./Button"


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    taskCount: number
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    deleteTask: (taskId: TaskType["id"]) => void
    changeTodolistFilter: (filter: FilterValuesType) => void
    createTask: (title: TaskType["title"]) => void
    changeTaskStatus: (taskId: TaskType["id"], isDone: TaskType["isDone"]) => void
}

export const Todolist = ({
    taskCount,
    tasks,
    title,
    filter,
    deleteTask,
    createTask,
    changeTaskStatus,
    changeTodolistFilter
}: PropsType) => {
    // 1.const tasks = props.tasks
    // const title = props.title
    // 2.const {tasks: tasks, title: title} = props
    // 3.const { tasks, title } = props
    // 4.

    const [taskInput, setTaskInput] = useState("")
    const [error, setError] = useState(false)


    const tasksList = tasks.length === 0
        ? <span>Tasks list is empty</span>
        : <ul>
            {
                tasks.map((task: TaskType) => {
                    return (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
                            />
                            <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                            <Button title="x" onClick={() => deleteTask(task.id)} />
                        </li>
                    )
                })
            }
        </ul>

    const createTaskHandler = () => {
        const trimmedTitle = taskInput.trim()
        if (trimmedTitle) {
            createTask(taskInput)
        } else {
            setError(true)
        }

        setTaskInput("")
    }

    const isTaskTitleValid = Boolean(taskInput.length) && taskInput.length <= 15
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskInput(e.currentTarget.value)
    }
    const onKeyDownCreateTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.ctrlKey && isTaskTitleValid) {
            createTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <span>{taskCount}</span>
            <div>
                <span>
                    <input
                        value={taskInput}
                        className={error ? "error" : ""}
                        onChange={setLocalTitleHandler}
                        onKeyDown={onKeyDownCreateTaskHandler}
                    />
                    {taskInput.length}
                </span>
                <Button
                    title="+"
                    disabled={!isTaskTitleValid}
                    onClick={createTaskHandler} />

                {taskInput.length === 0 && <div style={{ color: error ? "red" : "inherit" }}>Enter title end press button</div>}
                {isTaskTitleValid && <div>Max title length is 15 charters</div>}
                {taskInput.length > 15 && <div style={{ color: "red" }}>Title length is too long</div>}
            </div>
            {tasksList}
            <div>
                <Button
                    title="All"
                    onClick={() => changeTodolistFilter("all")}
                    className={filter === "all" ? "filter-btn-active" : ""}
                />
                <Button
                    title="Active"
                    onClick={() => changeTodolistFilter("active")}
                    className={filter === "active" ? "filter-btn-active" : ""}
                />
                <Button
                    title="Completed"
                    onClick={() => changeTodolistFilter("completed")}
                    className={filter === "completed" ? "filter-btn-active" : ""}
                />
            </div>
        </div>
    )
}