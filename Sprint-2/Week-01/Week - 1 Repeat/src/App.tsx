import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'

export type Task = {
  id: string
  title: string
  isDone: boolean
}



export type FilterValues = 'all' | 'active' | 'completed'

export type Todolists = {
  id: string
  title: string
  filter: FilterValues
}

type TaskState = {
  [key: string]: Task[]
}

export const App = () => {
  const Todolist_1 = v1()
  const Todolist_2 = v1()

  const [todolists, setTodolists] = useState<Todolists[]>([
    {id: Todolist_1, title: 'What to do', filter: 'all'},
    {id: Todolist_2, title: 'What to NOT do', filter: "all"}
  ])


  const [tasks, setTasks] = useState<TaskState>({
    [Todolist_1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [Todolist_2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],

  })

  const deleteTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })

  }

  const changeFilter = (todolistID: string, filter: FilterValues) => {
   const newTodolist = todolists.map(todolist => {
     return todolist.id === todolistID ? {...todolist, filter} : todolist
   })
    setTodolists(newTodolist)
  }



  const createTask = (todolistsId: string, title: string) => {
    const newTask = {id: v1(), title, isDone: false}
    const newTasks = {...tasks, [todolistsId]: [newTask, ...tasks[todolistsId]] }
    setTasks(newTasks)
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    const newState = {...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task )}
    setTasks(newState)
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
  }

  return (
      <div className="app">
        {todolists.map(todolist => {
          const todolistsTask = tasks[todolist.id]
          const getFilteredTasks = () => {
            switch (todolist.filter) {
              case 'active':
                return todolistsTask.filter(task => !task.isDone)
              case 'completed':
                return todolistsTask.filter(task => task.isDone)
              default:
                return todolistsTask
            }
          }
          return (
              <TodolistItem key = {todolist.id}
                            todolists = {todolist}
                            tasks={getFilteredTasks()}
                            deleteTask={deleteTask}
                            changeFilter={changeFilter}
                            createTask={createTask}
                            changeTaskStatus={changeTaskStatus}
                            deleteTodolist={deleteTodolist}
                            />
          )
        })}

      </div>
  )
}
