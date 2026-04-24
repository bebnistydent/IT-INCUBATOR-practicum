import {Button} from "./Button.tsx";
import {TasksItemProps} from "./Types.ts";
import {useState, KeyboardEvent, ChangeEvent} from "react";


export const TasksItem = ({title, tasks, deleteTask, filteredTasks, createTasks}: TasksItemProps) => {


 //const inputRef = useRef<HTMLInputElement>(null)

   const [TaskTitle, setTaskTitle] = useState("");

   const createTaskOnClickHandler = () => {
       createTasks(TaskTitle)
       setTaskTitle('')
   }
   const createTaskOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
       event.key === "Enter" && createTaskOnClickHandler()
       }
   const setTaskTitleOnChangeHandler = (e:ChangeEvent<HTMLInputElement>)  => setTaskTitle(e.currentTarget.value)

    const changeFilterAllOnClickHandler = () => filteredTasks('all')
    const changeFilterActiveOnClickHandler = () => filteredTasks('active')
    const changeFilterCompletedOnClickHandler = () => filteredTasks('completed')



    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={TaskTitle}
                    onChange={setTaskTitleOnChangeHandler}
                    onKeyDown={createTaskOnKeyDownHandler}
                />

                <Button
                    disabled={TaskTitle.length === 0 || TaskTitle.length > 10}
                    title={"+"}
                    onClickHandler={createTaskOnClickHandler}/>
            </div>
            {TaskTitle.length < 3 && <>Title should be at least 3 characters.</>}
            {TaskTitle.length > 10 && <>Title should be no longer than 10 characters.</>}
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title={"D"} onClickHandler={()=> deleteTask(task.id)}/>
                    </li>
                ))}

            </ul>
            <div>
                <Button title={"All"} onClickHandler={changeFilterAllOnClickHandler}/>
                <Button title={"Active"} onClickHandler={changeFilterActiveOnClickHandler}/>
                <Button title={"Completed"} onClickHandler={changeFilterCompletedOnClickHandler}/>
            </div>
        </div>
    )
}