import type {Task, TasksState} from '../app/App.tsx'
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

//Сначала идут экшены:

export const deleteTaskAC = createAction<{todolistId: string, taskId: string}>('delete_task');

export const createTaskAC = createAction<{todolistId: string, title: string}>('create_task');

export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('change_task_status');

export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('change_task_title');

//И только потом Reducers

const initialState: TasksState = {}

  export const tasksReducer = createReducer(initialState, builder => {
    builder
         .addCase(createTodolistAC, (state, action) => {
           state[action.payload.id] = []
         })
        .addCase(deleteTodolistAC, (state, action) => {
           delete state[action.payload.id]
        })
        .addCase(deleteTaskAC, (state, action) => {
             const tasks = state[action.payload.todolistId]
             const index = tasks.findIndex(task => task.id === action.payload.taskId)
             if(index !== -1) {
             tasks.splice(index, 1)
             }
        })
        .addCase(createTaskAC, (state, action) => {
            const newTask: Task = {
                id: nanoid(),
                title: action.payload.title,
                isDone: false
            }
            state[action.payload.todolistId].unshift(newTask)
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if(task) {
                task.isDone = action.payload.isDone
            }
        })
      .addCase(changeTaskTitleAC, (state, action) => {
          const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
          if(task) {
              task.title = action.payload.title
          }
      })

  })





