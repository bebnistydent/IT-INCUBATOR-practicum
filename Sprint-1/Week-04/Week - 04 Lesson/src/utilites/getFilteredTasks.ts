import { FilterValuesType } from "../App"
import { TaskType } from "../Todolist"

export const getFilterTasks = (tasks: TaskType[], filter: FilterValuesType) => {
    let filteredTasks = tasks

    if (filter === "active") {
        filteredTasks = tasks.filter(t => !t.isDone)
    }

    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    return filteredTasks
}