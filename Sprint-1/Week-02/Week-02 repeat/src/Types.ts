export type Task = {
    id: number
    title: string
    isDone: boolean
}

export type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: number) => void
    changeFilter: (newFilter: FilteredTasksType) => void
}

export type FilteredTasksType = "all" | "completed" | "active"