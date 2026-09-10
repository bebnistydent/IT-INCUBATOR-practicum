import { isAxiosError } from "axios"
import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice.ts"
import type { Dispatch } from "@reduxjs/toolkit"

export const catchError = (error: unknown, dispatch: Dispatch) => {
  if (isAxiosError(error)) {
    dispatch(setAppErrorAC({ error: error.response?.data?.message || error.message }))
  } else if (error instanceof Error) {
    dispatch(setAppErrorAC({ error: `Native error: ${error.message}` }))
  } else {
    dispatch(setAppErrorAC({ error: "Something went wrong" }))
  }
  dispatch(setAppStatusAC({ status: "failed" }))
}
