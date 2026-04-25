export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (newFilter: FilterValues) => void
    createTask: (title: string) => void
}

export type FilterValues = 'all' | 'active' | 'completed'