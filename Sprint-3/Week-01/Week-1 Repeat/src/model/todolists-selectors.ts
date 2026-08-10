import {Todolist} from "../app/App.tsx";
import {RootState} from "../app/store.ts";


export const selectTodolist = (state: RootState): Todolist[] => state.todolists