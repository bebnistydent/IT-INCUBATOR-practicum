import './App.css'
import {TasksItem} from "./TasksItem.tsx";
import {useState} from "react";
import {FilteredTaskValues, Task} from "./Types.ts";
import {v1} from "uuid";

function App() {

  const [tasks, setTasks] = useState<Task[]>([
    {id: v1(), title: "HTML", isDone: true},
    {id: v1(), title: "CSS", isDone: false},
    {id: v1(), title: "Java-Script", isDone: true},
    {id: v1(), title: "React", isDone: true},
    {id: v1(), title: "Node.js", isDone: false},
  ]);

  const deleteTask = (taskID: Task["id"]) => {
    const filteredTask = tasks.filter(task => task.id !== taskID)
    setTasks(filteredTask)
  }

 const createTasks = (title: Task['title']) => {
    //Создаём новую структуру данных
   const createdTasks: Task = {
    id: v1(),
    title: title,
    isDone: false,
   }


    const newTasks: Task[] = [...tasks, createdTasks]
    //Передаём новую структуру данных для обновления представления данных
       setTasks(newTasks)
 }


  const [filter, setFilter] = useState<FilteredTaskValues>("all")
  const filteredTasks = (newFilter: FilteredTaskValues) => {
    setFilter(newFilter)
  }
  const getFilteredTasks = (task: Task[], filter: FilteredTaskValues) => {
     switch (filter) {
       case "active":
         return task.filter(t => !t.isDone)
       case "completed":
         return task.filter(t => t.isDone)
       default:
         return task
     }
  }

  return (
      <div className="app">
       <TasksItem
           title={'What to learn'}
           tasks = {getFilteredTasks(tasks, filter)}
           deleteTask={deleteTask}
           filteredTasks={filteredTasks}
           createTasks={createTasks}
       />
      </div>
  )
}

export default App
