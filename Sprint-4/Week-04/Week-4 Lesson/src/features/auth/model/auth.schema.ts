import * as z from "zod"

export const loginSchema = z.object({
  email: z.email("Невалидный email"),
  password: z.string().min(3, "Пароль должен быть больше 3-х символов"),
  rememberMe: z.boolean(),
})
