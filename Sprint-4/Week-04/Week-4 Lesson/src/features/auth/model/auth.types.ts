import * as z from "zod"
import type { loginSchema } from "./auth.schema.ts"

export type LoginInputs = z.infer<typeof loginSchema>
