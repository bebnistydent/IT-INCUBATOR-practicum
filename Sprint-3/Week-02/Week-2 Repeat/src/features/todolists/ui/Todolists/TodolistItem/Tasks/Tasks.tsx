import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm.tsx'
import { TaskItem } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx'
import List from '@mui/material/List'
import { useAppSelector } from '@/common/hooks/useAppSelector.ts'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { selectTasks } from '@/features/todolists/model/tasks-selectors.ts'
import { createTaskAC, Task } from '@/features/todolists/model/tasks-reducer.ts'
import { Todolist } from '@/features/todolists/model/todolists-reducer.ts'

type Props = {
    todolist: Todolist
}

export const Tasks = ({ todolist }: Props) => {
    const { id, filter } = todolist

    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

    const todolistTasks = tasks[id] || []
    let filteredTasks = todolistTasks

    if (filter === 'active') {
        filteredTasks = todolistTasks.filter((task: Task) => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter((task: Task) => task.isDone)
    }

    const createTask = (title: string) => {
        dispatch(createTaskAC({ todolistId: id, title }))
    }

    return (
        <>
            <CreateItemForm onCreateItem={createTask} />

            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map((task: Task) => (
                        <TaskItem key={task.id} task={task} todolistId={id} />
                    ))}
                </List>
            )}
        </>
    )
}