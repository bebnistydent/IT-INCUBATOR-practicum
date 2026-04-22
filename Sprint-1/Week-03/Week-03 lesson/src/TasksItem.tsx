import {Button} from "./Button.tsx";
import {TasksItemProps} from "./Types.ts";


export const TasksItem = ({title, tasks, deleteTask, filteredTasks}: TasksItemProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={"+"} onClickHandler={() => {}}/>
            </div>
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
                <Button title={"All"} onClickHandler={() => filteredTasks('all')}/>
                <Button title={"Active"} onClickHandler={() => filteredTasks('active')}/>
                <Button title={"Completed"} onClickHandler={() => filteredTasks('completed')}/>
            </div>
        </div>
    )
}