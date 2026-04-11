import {Tasks_Type} from "./TaskType.ts";

type Todolist_Item_Type = {
    title: string
    task: Tasks_Type[]
}

export const Todolist_Item = (props: Todolist_Item_Type) => {
    const { title, task } = props
    const task_item = () => {
        if(task.length === 0 ) {
            return <li>You have nothing to do!</li>
        }
       return task.map((task) => (
            <li key={task.id}>
                <input type="checkbox" checked={task.isCompleted}/> <span>{task.title}</span>
            </li>
        ))

    };

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {task_item()}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}


