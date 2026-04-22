import './App.css'
import {TodolistItem} from './TodolistItem'
import {FilteredTasksType, Task} from "./Types.ts";
import { useState} from "react";



export const App = () => {
    const [tasks, setTasks] = useState<Task[]>([
            { id: 1, title: 'HTML&CSS', isDone: true },
            { id: 2, title: 'JS', isDone: true },
            { id: 3, title: 'ReactJS', isDone: false },
            { id: 4, title: 'Redux', isDone: false },
            { id: 5, title: 'Typescript', isDone: false },
            { id: 6, title: 'RTK query', isDone: false },
        ]);

    const deleteTask = (taskId: number) => {
        let filteredTasks: Task[] = tasks.filter((task: Task) => task.id !== taskId)
        setTasks(filteredTasks)
    }

   const [filter, setFilter] = useState<FilteredTasksType>('all')
    const changeFilter = (newFilter: FilteredTasksType) => {
        setFilter(newFilter)
    }
    const getFilteredTasks = (tasks: Task[], filter: FilteredTasksType): Task[] => {
        switch (filter) {
            case 'active':
                return tasks.filter((t) => !t.isDone)
            case 'completed':
                return tasks.filter((t) => t.isDone)
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
            changeFilter={changeFilter}
        />
      </div>
  )
}
