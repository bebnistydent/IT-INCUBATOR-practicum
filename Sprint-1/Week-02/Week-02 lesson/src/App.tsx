import './App.css'
import {TodolistItem} from './TodolistItem'
import {FilterValuesType, TaskType} from "./Types.ts";
import {useState} from "react";

//Crud: Create, Read, Update, Delete



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

  const [filter, setFilter] = useState<FilterValuesType>('all')

  const changeTodolistFilter = (filter: FilterValuesType) => {
    setFilter(filter)
  };

  const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
    //Это можно записать так
    // let filteredTasks: TaskType[] = tasks
    // if(filter === "active"){
    //   filteredTasks = tasks.filter(t => !t.isDone)
    // }
    // if(filter === "completed") {
    //   filteredTasks = tasks.filter(t => t.isDone)
    // }
    // return filteredTasks

    // Или так
    // return filter === "active"
    //     ? tasks.filter(t => !t.isDone)
    //     : filter === "completed"
    //         ? tasks.filter(t => t.isDone)
    //         : tasks

    // Или так
    switch (filter) {
      case "active":
        return tasks.filter(t => !t.isDone)
      case "completed":
        return tasks.filter(t => t.isDone)
      default:
        return tasks
    }

    //Выберай какой способ больше нравится
    //Это все суть одно и тоже
  };



  return (
      <div className="app">
        <TodolistItem
            title="What to learn"
            tasks={getFilteredTasks(tasks, filter)}
            deleteTask={deleteTask}
            changeTodolistFilter={changeTodolistFilter}
        />
      </div>
  )
}
