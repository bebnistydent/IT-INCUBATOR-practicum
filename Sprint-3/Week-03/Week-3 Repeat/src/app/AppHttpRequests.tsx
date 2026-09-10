import {type ChangeEvent, type CSSProperties, useEffect, useState} from 'react'
import Checkbox from '@mui/material/Checkbox'
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm'
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan'
import axios from 'axios'

export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type FieldError = {
  error: string
  field: string
}

type createTodolistResponse = {
  data: {item: Todolist}
  resultCode: number
  messages: string[]
  fieldErrors: FieldError[]
}

type DeleteTodolistResponse = {
  resultCode: number
  message: string[]
  fieldError: FieldError[]
}

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<any>({})

  const token = "98714a01-768c-423f-ab4e-10de101774cc"
  const apiKey = '76e44ca2-0240-4e38-b628-979621142900'

  useEffect(() => {
    // get todolists
    axios
        .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => setTodolists(res.data))

  }, [])

  const createTodolist = (title: string) => {
    axios
        .post<createTodolistResponse>(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'API-KEY': apiKey,
              },
            }
        ).then(res => {
          const newTodolist = res.data.data.item
          setTodolists([newTodolist, ...todolists])
    })
  }


  const deleteTodolist = (id: string) => {
    axios
        .delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'API-KEY': apiKey,
          },
        })
        .then(res =>{
          if(res.data.resultCode === 0) {
            setTodolists(todolists.filter(tl => tl.id !== id))
          } else {
            console.error("Error! Delete has failed", res.data.message)
          }
        }).catch(error => console.error('Request error', error))
  }

  const changeTodolistTitle = (id: string, title: string) => {
    axios
        .put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'API-KEY': apiKey,
              },
            }
        ).then(res => console.log(res.data))
  }

  const createTask = (todolistId: string, title: string) => {}

  const deleteTask = (todolistId: string, taskId: string) => {}

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: any) => {}

  const changeTaskTitle = (task: any, title: string) => {}

  return (
      <div style={{margin: '20px'}}>
        <CreateItemForm onCreateItem={createTodolist}/>
        {todolists.map((todolist) => (
            <div key={todolist.id} style={container}>
              <div>
                <EditableSpan value={todolist.title}
                              onChange={title => changeTodolistTitle(todolist.id, title)}/>
                <button onClick={() => deleteTodolist(todolist.id)}>x</button>
              </div>
              <CreateItemForm onCreateItem={title => createTask(todolist.id, title)}/>
              {tasks[todolist.id]?.map((task: any) => (
                  <div key={task.id}>
                    <Checkbox checked={task.isDone}
                              onChange={e => changeTaskStatus(e, task)}/>
                    <EditableSpan value={task.title}
                                  onChange={title => changeTaskTitle(task, title)}/>
                    <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
                  </div>
              ))}
            </div>
        ))}
      </div>
  )
}

const container: CSSProperties = {
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
}
