export type FieldError = {
    error: string
    field: string
}

export type BaseResponse<T = {}> = {
    data: T
    resultCode: number
    message: string[]
    fieldsErrors: FieldError[]
}