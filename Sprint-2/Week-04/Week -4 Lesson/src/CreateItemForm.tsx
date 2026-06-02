import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "./Button"
import { Chip, IconButton, TextField } from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox';

type PropsType = {
    createItem: (itemTitle: string) => void
    maxItemTitleLenght: number
}

export const CreateItemForm = ({ createItem, maxItemTitleLenght }: PropsType) => {
    const [itemInput, setItemInput] = useState("")
    const [error, setError] = useState(false)

    const isItemTitleValid = Boolean(itemInput.length) && itemInput.length <= maxItemTitleLenght
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setItemInput(e.currentTarget.value)
    }

    const onKeyDownCreateItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.ctrlKey && isItemTitleValid) {
            createItemHandler()
        }
    }

    const createItemHandler = () => {
        const trimmedTitle = itemInput.trim()
        if (trimmedTitle) {
            createItem(trimmedTitle)
        } else {
            setError(true)
        }
        setItemInput("")
    }

    const userMessage = itemInput.length === 0
        ? <div style={{ color: error ? "red" : "inherit" }}>Enter title end press button</div>
        : isItemTitleValid
            ? <div>Max title length is {maxItemTitleLenght} charters</div>
            : itemInput.length > maxItemTitleLenght
                ? <div style={{ color: "red" }}>Title length is too long</div>
                : ""
    return (
        <div>
            <span>
                <TextField
                    size="small"
                    value={itemInput}
                    onChange={setLocalTitleHandler}
                    onKeyDown={onKeyDownCreateItemHandler}
                    error={error}
                    helperText={userMessage}
                />
                <Chip label={itemInput.length} variant="outlined" />
            </span>

            <IconButton
                disabled={!isItemTitleValid}
                onClick={createItemHandler}>
                <AddBoxIcon />
            </IconButton>
        </div>
    )
}