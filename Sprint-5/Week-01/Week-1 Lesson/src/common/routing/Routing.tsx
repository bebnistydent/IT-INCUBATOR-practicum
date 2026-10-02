import { Main } from "@/app/Main"
import { PageNotFound } from "@/common/components"
import { Login } from "@/features/auth/ui/Login/Login"
import { Faq } from "@/features/faq/ui/Faq/Faq"
import { Route, Routes } from "react-router"
import { ProtectedRoutes } from "@/common/components/ProtectedRoutes"
import { useAppSelector } from "@/common/hooks"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts"

export const Path = {
  Main: "/",
  Faq: "/faq",
  Login: "/login",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route element={<ProtectedRoutes isAllowed={isLoggedIn} redirectPath={Path.Login} />}>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.Faq} element={<Faq />} />
      </Route>

      <Route element={<ProtectedRoutes isAllowed={!isLoggedIn} redirectPath={Path.Main} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>

      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}

//
// <Route
//   path={Path.Main}
//   element={
//     <ProtectedRoutes isAllowed={isLoggedIn} redirectPath={Path.Login}>
//       <Main />
//     </ProtectedRoutes>
//   }
// />
// <Route
//   path={Path.Faq}
//   element={
//     <ProtectedRoutes isAllowed={isLoggedIn} redirectPath={Path.Login}>
//       <Faq />
//     </ProtectedRoutes>
//   }
// />

// ;<Route
//   path={Path.Login}
//   element={
//     <ProtectedRoutes isAllowed={!isLoggedIn} redirectPath={Path.Main}>
//       <Login />
//     </ProtectedRoutes>
//   }
// />
