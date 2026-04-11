import './App.css'
import {Todolist_Item} from "./TodolistItem.tsx";
import {Tasks_Type} from "./TaskType.ts";
import {v1} from "uuid";

function App() {
    //Data
    const task: Tasks_Type[] = [
        {id: v1(), title: "Sleep", isCompleted: false},
        {id: v1(), title: "Rub my back", isCompleted: true},
        {id: v1(), title: "Stop to fear", isCompleted: false},
    ]




    //Execution part
  return (
      <div className="app">
       <Todolist_Item title = "What to do?" task={task}/>
      </div>
  )
}

export default App
