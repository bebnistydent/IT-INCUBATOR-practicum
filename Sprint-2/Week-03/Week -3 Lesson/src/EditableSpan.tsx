import { TextField, Box } from "@mui/material"
import { ChangeEvent, useState } from "react"
import { TaskType } from "./Todolist"
import { getTaskSx } from "./EditableSpan.styles"

type PropsType = {
    title: string
    changeTitle: (newTitle: string) => void
    isDone: TaskType["isDone"]
}
export const EditableSpan = ({ title, changeTitle, isDone }: PropsType) => {
    const [itemTitle, setItemTitle] = useState(title)
    const [editMode, setEditMode] = useState(false)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        changeTitle(itemTitle)
        setEditMode(false)
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <TextField
                size="small"
                variant="filled"
                autoFocus
                value={itemTitle}
                onChange={setLocalTitleHandler}
                onBlur={offEditMode}
            />
            : <Box
                sx={getTaskSx(isDone)}
                component="span"
                onDoubleClick={onEditMode}>
                {title}
            </Box>
    )
}