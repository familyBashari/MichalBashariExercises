import { ReactNode } from "react"
import { useAppSelector } from "../redux/store"
import { Navigate, useLocation } from "react-router-dom"
import { PATHS } from "../routes/paths"
import { selectAuth } from "../redux/auth/auth.selector"
import { useSelector } from "react-redux"

type Props = {
    children: ReactNode
}

export default function AuthGuard({ children }: Props) {
    // const { isAuthanticated, isInitialized } = useAppSelector(selectAuth)
    const { isAuthanticated, isInitialized } = useSelector(selectAuth)

    const { pathname } = useLocation()

    if (!isInitialized) {
        return <h1>Loading...</h1>
    }

    if (!isAuthanticated) {
        return <Navigate to={PATHS.login} state={pathname} />
    }

    return <>{children}</>
}