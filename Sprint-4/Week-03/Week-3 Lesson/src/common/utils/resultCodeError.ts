import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice.ts"
import type { Dispatch } from "@reduxjs/toolkit"

export const resultCodeError = (messages: string[], dispatch: Dispatch) => {
  const error = messages.length ? messages[0] : "Something went wrong"
  dispatch(setAppErrorAC({ error }))
  dispatch(setAppStatusAC({ status: "failed" }))
}
