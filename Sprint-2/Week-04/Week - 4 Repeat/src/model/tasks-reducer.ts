import type { TasksState } from '../App'
import type {CreateTodolistAction, DeleteTodolistAction} from './todolists-reducer'

type Actions = CreateTodolistAction | DeleteTodolistAction

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }
        case 'delete_todolist': {
            const newState = { ...state }
            delete newState[action.payload.id]
            return newState
        }
        default:
            return state
    }
}

