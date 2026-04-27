import { useState, useRef } from 'react'

import './App.css'

import { getFilterTasks } from './utilites/getFilteredTasks'
import { v1 } from 'uuid'
import { TaskType, Todolist } from './Todolist'

export type FilterValuesType = "all" | "active" | "completed"

export function App() {



  // BLL
  const todolistTitle = "What to learn"

  const createTaskCount = useRef(4)

  const [tasks, setTasks] = useState([
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS/TS", isDone: false },
    { id: v1(), title: "REDUX", isDone: false },
  ])


  const deleteTask = (taskId: TaskType["id"]) => {
    const nextTasksState: TaskType[] = tasks.filter(t => t.id !== taskId)
    setTasks(nextTasksState)
  }

  const createTask = (title: TaskType["title"]) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    const nextTasksState: TaskType[] = [newTask, ...tasks]
    setTasks(nextTasksState)
    createTaskCount.current = createTaskCount.current + 1
  }

  const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType["isDone"]) => {
    const nextState: TaskType[] = tasks.map(t => t.id === taskId ? { ...t, isDone: isDone } : t)
    setTasks(nextState)
  }


  // UI
  const [filter, setFilter] = useState<FilterValuesType>("all")
  const changeTodolistFilter = (filter: FilterValuesType) => setFilter(filter)
  const filteredTasks = getFilterTasks(tasks, filter)

  return (
    <div className="app">
      <Todolist
        taskCount={createTaskCount.current}
        title={todolistTitle}
        tasks={filteredTasks}
        filter={filter}
        deleteTask={deleteTask}
        changeTodolistFilter={changeTodolistFilter}
        changeTaskStatus={changeTaskStatus}
        createTask={createTask}
      />
    </div>
  )
}


