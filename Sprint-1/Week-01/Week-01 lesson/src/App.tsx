import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {TaskType} from "./type.ts";





function App() {
  //BLL(Model)
  const todolist_title_1: string = 'What to learn'
  const todolist_title_2: string = 'What to buy'
  const tasks_1: TaskType[] = [
      {id: 1, title: "HTML", isDone: true,},
      {id: 2, title: "Java-Script", isDone: false,},
      {id: 3, title: "React", isDone: false,},
      {id: 4, title: "Git", isDone: false,},
  ]
    const tasks_2: TaskType[] = [
        {id: 4, title: "Meat", isDone: true,},
        {id: 5, title: "Bread", isDone: false,},
        {id: 6, title: "beer", isDone: false,},
    ]




  //GUI(Graphic User interface (view))
  return (
      <div className="app">
       <TodolistItem title={todolist_title_1} tasks={tasks_1}/>
        <TodolistItem title={todolist_title_2} tasks={tasks_2}/>
      </div>
  )
}

export default App
