import { useState } from 'react'
import './App.css'
import { getFilterTasks } from './utilites/getFilteredTasks'
import { v1 } from 'uuid'
import { TaskType, Todolist } from './Todolist'
import { CreateItemForm } from './CreateItemForm'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { container } from './Todolist.styles'
import { NavButton } from './NavButton'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { green, red } from '@mui/material/colors'
import { CssBaseline } from '@mui/material'
import Switch from '@mui/material/Switch';

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [todolistId: string]: TaskType[]
}

export function App() {
  // BLL

  const todolistId_1 = v1()
  const todolistId_2 = v1()
  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId_1, title: "What to learn", filter: "all" },
    { id: todolistId_2, title: "What to buy", filter: "all" },
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId_1]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS/TS", isDone: false },
      { id: v1(), title: "REDUX", isDone: false },
    ],
    [todolistId_2]: [
      { id: v1(), title: "MEAT", isDone: true },
      { id: v1(), title: "MILK", isDone: true },
      { id: v1(), title: "LIVER", isDone: false },
      { id: v1(), title: "WATER", isDone: false },
    ],

  })
  // tasks
  const deleteTask = (taskId: TaskType["id"], todolistId: TodolistType["id"]) => {
    const todolistsTasks = tasks[todolistId]
    const filteredTasks = todolistsTasks.filter(t => t.id !== taskId)
    const nextTasksState = { ...tasks }
    nextTasksState[todolistId] = filteredTasks
    setTasks(nextTasksState)

    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) })
  }
  const createTask = (title: TaskType["title"], todolistId: TodolistType["id"]) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    // const addedTasks = [...tasks[todolistId], newTask]
    // const nextTasksState = { ...tasks }
    // nextTasksState[todolistId] = addedTasks
    // setTasks(nextTasksState)
    //
    setTasks({
      ...tasks,
      [todolistId]: [...tasks[todolistId], newTask]
    })
  }
  const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"]) => {
    // const todolistsTasks = tasks[todolistId]
    // const updatedTasks = todolistsTasks.map(t => t.id === taskId ? { ...t, isDone: isDone } : t)
    // const nextTasksState = { ...tasks }
    // nextTasksState[todolistId] = updatedTasks
    // setTasks(nextTasksState)
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone: isDone } : t)
    })
  }
  const changeTaskTitle = (taskId: TaskType["id"], title: TaskType["title"], todolistId: TodolistType["id"]) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, title: title } : t)
    })
  }

  // todolists
  const changeTodolistFilter = (filter: FilterValuesType, todolistId: TodolistType["id"]) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl))
  }
  const deleteTodolist = (todolistId: TodolistType["id"]) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
  }
  const createTodolist = (title: TodolistType["title"]) => {
    const newTodoId = v1()
    const newTodo: TodolistType = {
      id: newTodoId,
      title: title,
      filter: "all"
    }
    setTodolists([...todolists, newTodo])
    setTasks({ ...tasks, [newTodoId]: [] })
  }
  const changeTodolistTitle = (title: TodolistType["title"], todolistId: TodolistType["id"]) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, title: title } : tl))
  }


  // UI



  const todolistsComponents = todolists.map(tl => {
    const filteredTasks = getFilterTasks(tasks[tl.id], tl.filter)
    return (
      <Grid key={tl.id}>
        <Paper
          sx={{ p: "15px" }}
          elevation={6}
        >
          <Todolist
            todolistId={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            filter={tl.filter}
            deleteTask={deleteTask}
            changeTodolistFilter={changeTodolistFilter}
            changeTaskStatus={changeTaskStatus}
            createTask={createTask}
            deleteTodolist={deleteTodolist}
            changeTodolistTitle={changeTodolistTitle}
            changeTaskTitle={changeTaskTitle}
          />
        </Paper>
      </Grid>
    )
  })

  const [isDark, setIsDark] = useState(false)

  const theme = createTheme({
    palette: {
      primary: red,
      secondary: green,
      mode: isDark ? "dark" : "light"
    },
  })

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar sx={container}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <Box>
              <Switch onChange={() => setIsDark(!isDark)} />
              <NavButton>Sign in</NavButton>
              <NavButton>Sign up</NavButton>
              <NavButton background={theme.palette.primary.light}>Faq</NavButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Container maxWidth={'lg'}>
          <Grid container sx={{ p: "15px 0" }}>
            <CreateItemForm createItem={createTodolist} maxItemTitleLenght={15} />
          </Grid>
          <Grid
            container
            spacing={4}
          >
            {todolistsComponents}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App;


