import { type TaskPriority, TaskStatus } from "@/common/enums/enums"

export type DomainTask = {
  description?: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId?: string
  order?: number
  addedDate?: string
}

type Model1 = Required<DomainTask>
type Model2 = Partial<DomainTask>

type Model3 = Omit<DomainTask, "todoListId" | "addedDate">
type Model4 = Pick<DomainTask, "description" | "todoListId" | "addedDate">

export type FilterValues = "all" | "active" | "completed"

type Model5 = Exclude<FilterValues, "all">
type Model6 = Extract<FilterValues, "active" | "completed">

const sum = (num: number, arg: Model6): string => {
  return num + "12"
}

type Model7 = ReturnType<typeof sum>
type Model8 = Parameters<typeof sum>[1]

export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}
