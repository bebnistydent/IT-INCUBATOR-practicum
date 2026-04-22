import {TaskType} from "./type.ts";
import {Button} from "./Button.tsx";


type PropsType = {
    title: string
    tasks: TaskType[]
}



export const TodolistItem = (props: PropsType) => {
    const {title, tasks} = props;

    const taskList = tasks.length === 0 ?
        <span>Your task list is empty</span> :<ul>
            {tasks.map((task: TaskType) => {
                return (
                    <li key = {task.id}>
                        <input type = "checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                    </li>
                )
            })}
        </ul>

      return (
          <div>
              <h3>{title}</h3>
              <div>
                  <input/>
                  <button>+</button>
              </div>
              {taskList}
              <div>
                  <Button title={"All"} />
                  <Button title={"Active"} />
                  <Button title={"Completed"} />
              </div>
          </div>
      )
}