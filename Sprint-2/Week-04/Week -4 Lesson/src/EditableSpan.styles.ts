import { SxProps } from "@mui/material/styles";
import { TaskType } from "./Todolist";

export const getTaskSx = (isDone: TaskType["isDone"]): SxProps => ({
    fontWeight: isDone ? "normal" : "bold",
    textDecoration: isDone ? "line-through" : "none",
    fontStyle: isDone ? "italic" : "normal",
    opacity: isDone?  0.5 : 1
})


