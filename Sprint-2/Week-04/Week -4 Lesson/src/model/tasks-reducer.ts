import { TasksStateType } from "../App";
import { CreateTodolistAT, DeleteTodolistAT } from "./todolists-reducer";

type ActionType = DeleteTodolistAT | CreateTodolistAT

export const tasksReducer = (tasks: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "create_todolist":
            return { ...tasks, [action.payload.id]: [] }

        case "delete_todolist":
            const nextState = { ...tasks }
            delete nextState[action.payload.id]
            return nextState
        
        default:
            return tasks;
    }

}