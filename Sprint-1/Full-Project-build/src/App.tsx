import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
}

export type FilteredValueType = 'all' | 'completed' | 'active'

function App() {
  //Data we work with
  const [tasks, setTasks] = useState<Task[]>([
      {id: v1(), title: "HTML/CSS", isDone: false},
      {id: v1(), title: "Java-Script", isDone: false},
      {id: v1(), title: "React", isDone: false},
      {id: v1(), title: "How to play video games", isDone: true},
  ]);

 //FilteredTasks
  const [filter, setFilter] = useState<FilteredValueType>('all')
  const changeFilter = (newFilter: FilteredValueType) => {
      setFilter(newFilter);
  }
  const getFilteredTasks = () => {
      switch(filter) {
          case 'active':
              return tasks.filter(task => !task.isDone)
          case 'completed':
              return tasks.filter(task => task.isDone)
          default:
              return tasks
      }
  }

    const deleteTasks = (taskId: Task['id']) => {
        const deleterTask = tasks.filter(task => task.id !== taskId)
        setTasks(deleterTask);
    }

    const createTask = (title: Task['title']) => {
      const newTasks: Task = {id: v1(), title: title, isDone: false};
      const createdTask = [...tasks, newTasks];
      setTasks(createdTask);
    }
    const changeTaskStatus = (taskID: Task['id'], isDone: Task['isDone']) => {
        const newStatus = tasks.map(task => task.id === taskID ? {...task, isDone}  : task)
        setTasks(newStatus);
    }



  return (
      <div className="app">
       <TodolistItem
           title = "What to Learn"
           tasks = {getFilteredTasks()}
           deleteTasks={deleteTasks}
           changeFilter={changeFilter}
           createTask={createTask}
           changeTaskStatus={changeTaskStatus}
           filter={filter}

       />
      </div>
  )
}

export default App
