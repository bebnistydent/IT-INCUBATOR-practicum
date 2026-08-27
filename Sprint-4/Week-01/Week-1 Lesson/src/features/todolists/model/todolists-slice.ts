import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import type { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    // 'todolists/createTodolistAC'
    createTodolistAC: create.preparedReducer(
      (title: string) => {
        const newTodolist: DomainTodolist = {
          title,
          filter: "all",
          id: nanoid(),
          addedDate: "",
          order: 1,
        }
        return {
          payload: newTodolist,
        }
      },
      (state, action) => {
        state.push(action.payload)
      },
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (_state, action) => {
        return action.payload.map((tl) => ({ ...tl, filter: "all" }))
      })
      .addCase(fetchTodolistsTC.rejected, (_state, action) => {
        alert(action.payload)
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
  },
})

// Thunk
export const fetchTodolistsTC = createAsyncThunk(
  `${todolistsSlice.name}/fetchTodolistsTC`,
  async (_arg, { rejectWithValue }) => {
    try {
      const res = await todolistsApi.getTodolists()
      return res.data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (args: { id: string; title: string }, { rejectWithValue }) => {
    try {
      await todolistsApi.changeTodolistTitle(args)
      return args
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const { createTodolistAC, deleteTodolistAC, changeTodolistFilterAC } = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

export type DomainTodolist = Todolist & { filter: FilterValues }

export type FilterValues = "all" | "active" | "completed"
