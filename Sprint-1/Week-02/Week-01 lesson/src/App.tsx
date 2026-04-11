import './App.css'
import {TodolistItem} from './TodolistItem'
import {TaskType} from "./Types.ts";
import {useState} from "react";



export const App = () => {
  //BLL (model)
  const [tasks, setTask] = useState<TaskType[]>([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
    { id: 5, title: 'Typescript', isDone: false },
    { id: 6, title: 'RTK query', isDone: false },
  ])

  const deleteTask = (taskId: TaskType["id"]) => {
     //1. We should create next state (immutable)
    const nextState: TaskType[] = tasks.filter(t => t.id !== taskId)
    //2. After we must update state with new data
    setTask(nextState)
  }


  //GUI (Graphical user interface)
  return (
      <div className="app">
        <TodolistItem
            title="What to learn"
            tasks={tasks}
            deleteTask={deleteTask}
        />
      </div>
  )
}
