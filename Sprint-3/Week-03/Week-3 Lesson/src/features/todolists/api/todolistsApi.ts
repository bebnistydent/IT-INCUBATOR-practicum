import {instance} from '@/common/instance/instance'
import type {BaseResponse} from '@/common/types'
import type {Todolist} from '@/features/todolists/api/todolistsApi.types'

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>('/todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>('/todo-lists', {title})
  }
}