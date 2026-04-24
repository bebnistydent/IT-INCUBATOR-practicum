export type Task = {
    id: number
    title: string
    isDone: boolean
}

export type TasksItemProps = {
    title: string
    tasks: Task[]
    deleteTask: (taskID: Task["id"]) => void
    filteredTasks: (newFilter: FilteredTaskValues) => void
}

export type FilteredTaskValues = 'all' | 'active' | 'completed'