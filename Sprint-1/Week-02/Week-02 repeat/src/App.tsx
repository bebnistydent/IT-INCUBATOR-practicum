import './App.css'
import {TodolistItem} from './TodolistItem'
import {useState} from "react";
import {FilteredValueTypes} from "./Types.ts";

export type Task = {
  id: number
  title: string
  isDone: boolean
}

export const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
      { id: 1, title: 'HTML&CSS', isDone: true },
      { id: 2, title: 'JS', isDone: true },
      { id: 3, title: 'ReactJS', isDone: false },
      { id: 4, title: 'Redux', isDone: false },
      { id: 5, title: 'Typescript', isDone: false },
      { id: 6, title: 'RTK query', isDone: false },
]);

  const deleteTask = (taskID: Task["id"]) => {
    const deletedTasks = tasks.filter((t) => t.id !== taskID)
    setTasks(deletedTasks);
  }

  const [filter, setFilter] = useState<FilteredValueTypes>("all");
  const filteredTasks = (newFilter: FilteredValueTypes) => {
    setFilter(newFilter);
  };

  const getFilteredTasks = (tasks: Task[], getFilter: FilteredValueTypes) => {
       switch(getFilter) {
         case "active":
           return tasks.filter(t =>  !t.isDone)
         case "completed":
           return tasks.filter(t => t.isDone)
         default:
           return tasks
       }
  }
  return (
      <div className="app">
        <TodolistItem
            title="What to learn"
            tasks={getFilteredTasks(tasks, filter)}
            deleteTask={deleteTask}
            filteredTasks = {filteredTasks}
        />
      </div>
  )
}
