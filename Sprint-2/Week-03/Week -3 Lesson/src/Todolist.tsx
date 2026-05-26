import { Button, Checkbox, IconButton } from "@mui/material"
import { FilterValuesType, TodolistType } from "./App"
import { CreateItemForm } from './CreateItemForm'
import { EditableSpan } from './EditableSpan'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { container } from "./Todolist.styles";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: TodolistType["id"]
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    deleteTask: (taskId: TaskType["id"], todolistId: TodolistType["id"]) => void
    changeTodolistFilter: (filter: FilterValuesType, todolistId: TodolistType["id"]) => void
    createTask: (title: TaskType["title"], todolistId: TodolistType["id"]) => void
    changeTaskStatus: (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"]) => void
    deleteTodolist: (todolistId: TodolistType["id"]) => void
    changeTodolistTitle: (title: TodolistType["title"], todolistId: TodolistType["id"]) => void
    changeTaskTitle: (taskId: TaskType["id"], title: TaskType["title"], todolistId: TodolistType["id"]) => void
}

export const Todolist = ({
    todolistId,
    tasks,
    title,
    filter,
    deleteTask,
    createTask,
    changeTaskStatus,
    changeTodolistFilter,
    changeTodolistTitle,
    deleteTodolist,
    changeTaskTitle
}: PropsType) => {



    const tasksList = tasks.length === 0
        ? <span>Tasks list is empty</span>
        : <List>
            {
                tasks.map((task: TaskType) => {
                    const changeTaskTitleHandler = (newTitle: TaskType["title"]) => {
                        changeTaskTitle(task.id, newTitle, todolistId)
                    }
                    return (
                        <ListItem
                            sx={container}
                            disablePadding
                            key={task.id}
                        >
                            <Checkbox
                                size="small"
                                checked={task.isDone}
                                onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)}
                            />

                            <EditableSpan
                                isDone={task.isDone}
                                title={task.title}
                                changeTitle={changeTaskTitleHandler}
                            />
                            <IconButton
                                size="small"
                                onClick={() => deleteTask(task.id, todolistId)}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </ListItem>
                    )
                })
            }
        </List>

    const createTaskHandler = (taskTitle: TaskType["title"]) => {
        createTask(taskTitle, todolistId)
    }

    const changeTodolistTitleHandler = (newTitle: TodolistType["title"]) => {
        changeTodolistTitle(newTitle, todolistId)
    }





    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodolistTitleHandler} isDone={false}/>
                <IconButton
                    onClick={() => deleteTodolist(todolistId)}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </h3>
            <CreateItemForm createItem={createTaskHandler} maxItemTitleLenght={15} />
            {tasksList}
            <Box sx={container}>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    color={filter === "all" ? "secondary" : "primary"}
                    onClick={() => changeTodolistFilter("all", todolistId)}
                >
                    All
                </Button>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    color={filter === "active" ? "secondary" : "primary"}
                    onClick={() => changeTodolistFilter("active", todolistId)}
                >
                    Active
                </Button>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    color={filter === "completed" ? "secondary" : "primary"}
                    onClick={() => changeTodolistFilter("completed", todolistId)}
                >
                    Completed
                </Button>
            </Box>
        </div>
    )
}