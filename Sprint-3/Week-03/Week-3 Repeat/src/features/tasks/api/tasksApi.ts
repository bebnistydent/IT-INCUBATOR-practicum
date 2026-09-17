// features/tasks/api/tasksApi.ts
import { instance } from '@/common/instance/instance.ts'
import { BaseResponse } from '@/common/types'
import {Task} from "@/features/tasks/api/tasksApi.types.ts";


export const tasksApi = {
    createTask(todolistId: string, title: string) {
        return instance.post<BaseResponse<{ item: Task }>>(
            `/todo-lists/${todolistId}/tasks`,
            { title }
        )
    },
}