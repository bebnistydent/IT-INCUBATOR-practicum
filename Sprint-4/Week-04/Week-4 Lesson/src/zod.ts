import * as z from "zod"

type LoginInputs = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(3).max(10),
  rememberMe: z.boolean(),
  site: z.httpUrl().nullish(),
  category: z.union([z.string(), z.number()]),
  addedDate: z.iso.datetime({ local: true }),
})

const client1: LoginInputs = {
  email: "test@test.com",
  password: "123456789",
  rememberMe: true,
  site: "http://test.com",
  category: 1,
  addedDate: "2026-09-14T18:04:52.237",
}

console.log(loginSchema.parse(client1))
