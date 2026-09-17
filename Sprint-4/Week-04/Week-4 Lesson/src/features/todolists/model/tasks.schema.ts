import * as z from "zod"
import { TaskPriority, TaskStatus } from "@/common/enums"

export const taskSchema = z.object({
  description: z.string().nullable(), // null
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  startDate: z.string().nullable(), // null
  deadline: z.string().nullable(), // null
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.iso.datetime({ local: true }),
})
