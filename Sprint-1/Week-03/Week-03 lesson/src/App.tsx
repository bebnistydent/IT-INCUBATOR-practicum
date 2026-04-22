import './App.css'
import {TasksItem} from "./TasksItem.tsx";
import {useState} from "react";
import {FilteredTaskValues, Task} from "./Types.ts";

function App() {

  const [tasks, setTasks] = useState<Task[]>([
    {id: 1, title: "HTML", isDone: true},
    {id: 2, title: "CSS", isDone: false},
    {id: 3, title: "Java-Script", isDone: true},
    {id: 4, title: "React", isDone: true},
    {id: 5, title: "Node.js", isDone: false},
  ]);

  const deleteTask = (taskID: Task["id"]) => {
    const filteredTask = tasks.filter(task => task.id !== taskID)
    setTasks(filteredTask)
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
       />
      </div>
  )
}

export default App
