import './App.css'
import {useState} from 'react'
import {TodolistItem} from './TodolistItem'
import {v1} from "uuid";
import {FilterValues} from "./Types.ts";
import {Task} from "./Types.ts";



export const App = () => {
  const [filter, setFilter] = useState<FilterValues>('all')

  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ])

  const deleteTask = (taskId: string) => {
    const filteredTasks = tasks.filter(task => {
      return task.id !== taskId
    })
    setTasks(filteredTasks)
  }

  const createTask = (title: string) => {
    const newTask = {id: v1(), title: title, isDone: false}
    const newTasks = [newTask,...tasks]
    setTasks(newTasks)

  }

  const changeFilter = (newFilter: FilterValues) => {
    setFilter(newFilter)
  }
  const getFiltetredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.isDone)
      case 'completed':
        return tasks.filter(task => task.isDone)
      default:
        return tasks
    }
  }

  return (
      <div className="app">
        <TodolistItem title="What to learn"
                      tasks={getFiltetredTasks()}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      createTask={createTask}
        />
      </div>
  )
}
