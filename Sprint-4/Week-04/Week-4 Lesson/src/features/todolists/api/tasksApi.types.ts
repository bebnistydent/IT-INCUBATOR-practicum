import type { TaskPriority, TaskStatus } from "@/common/enums/enums"
import * as z from "zod"
import { taskSchema } from "@/features/todolists/model/tasks.schema.ts"

export type DomainTask = z.infer<typeof taskSchema>

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type UpdateTaskModel = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
