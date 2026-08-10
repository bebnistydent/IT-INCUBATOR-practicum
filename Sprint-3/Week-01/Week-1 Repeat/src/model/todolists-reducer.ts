import type {FilterValues, Todolist} from '../app/App.tsx'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

//Сначала идут экшены:

export const deleteTodolistAC = createAction<{id: string}>('todolist/deleteTodolist')

export const createTodolistAC = createAction('todolist/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})

export const changeTodolistTitleAC = createAction<{id: string, title: string}>('todolist/changeTodolistAC')

export const changeTodolistFilterAC = createAction<{id: string, filter: FilterValues}>('todolist/changeTodolistFilterAC')

//И только потом Reducers
const initialState: Todolist[] = []

export const todolistsReducer = createReducer(initialState, builder => {
  builder
      .addCase(deleteTodolistAC, (state, action)=> {
        const index = state.findIndex(todolist => todolist.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(createTodolistAC, (state, action) => {
        state.push({...action.payload, filter: 'all'})
      })
      .addCase(changeTodolistTitleAC, (state, action) => {
        const index = state.findIndex(todolist => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addCase(changeTodolistFilterAC, (state, action) => {
        const todolist = state.find(todolist => todolist.id === action.payload.id)
        if(todolist) {
          todolist.filter = action.payload.filter
        }
      })
})




export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>


export type Actions =
    | DeleteTodolistAction
    | CreateTodolistAction

