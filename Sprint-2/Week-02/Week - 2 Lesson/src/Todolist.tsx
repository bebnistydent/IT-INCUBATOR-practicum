import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValuesType, TodolistType } from "./App"
import { Button } from "./Button"
import { CreateItemForm } from './CreateItemForm'
import { EditableSpan } from './EditableSpan'


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: TodolistType["id"]
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    deleteTask: (taskId: TaskType["id"], todolistId: TodolistType["id"]) => void
    changeTodolistFilter: (filter: FilterValuesType, todolistId: TodolistType["id"]) => void
    createTask: (title: TaskType["title"], todolistId: TodolistType["id"]) => void
    changeTaskStatus: (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"]) => void
    deleteTodolist: (todolistId: TodolistType["id"]) => void
    changeTodolistTitle: (title: TodolistType["title"], todolistId: TodolistType["id"]) => void
    changeTaskTitle: (taskId: TaskType["id"], title: TaskType["title"], todolistId: TodolistType["id"]) => void
}

export const Todolist = ({
    todolistId,
    tasks,
    title,
    filter,
    deleteTask,
    createTask,
    changeTaskStatus,
    changeTodolistFilter,
    changeTodolistTitle,
    deleteTodolist,
    changeTaskTitle
}: PropsType) => {



    const tasksList = tasks.length === 0
        ? <span>Tasks list is empty</span>
        : <ul>
            {
                tasks.map((task: TaskType) => {
                    const changeTaskTitleHandler = (newTitle: TaskType["title"]) => {
                        changeTaskTitle(task.id, newTitle, todolistId)
                    }
                    return (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)}
                            />

                            <EditableSpan
                                className={task.isDone ? "task-done" : "task"}
                                title={task.title}
                                changeTitle={changeTaskTitleHandler}
                            />
                            <Button title="x" onClick={() => deleteTask(task.id, todolistId)} />
                        </li>
                    )
                })
            }
        </ul>

    const createTaskHandler = (taskTitle: TaskType["title"]) => {
        createTask(taskTitle, todolistId)
    }

    const changeTodolistTitleHandler = (newTitle: TodolistType["title"]) => {
        changeTodolistTitle(newTitle, todolistId)
    }





    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodolistTitleHandler} />
                <Button title="x" onClick={() => deleteTodolist(todolistId)} />
            </h3>
            <CreateItemForm createItem={createTaskHandler} maxItemTitleLenght={15} />
            {tasksList}
            <div>
                <Button
                    title="All"
                    onClick={() => changeTodolistFilter("all", todolistId)}
                    className={filter === "all" ? "filter-btn-active" : ""}
                />
                <Button
                    title="Active"
                    onClick={() => changeTodolistFilter("active", todolistId)}
                    className={filter === "active" ? "filter-btn-active" : ""}
                />
                <Button
                    title="Completed"
                    onClick={() => changeTodolistFilter("completed", todolistId)}
                    className={filter === "completed" ? "filter-btn-active" : ""}
                />
            </div>
        </div>
    )
}