import { ReactNode, useEffect } from "react"
import { useAppDispatch } from "../redux/store"
import { getSession, isValidToken } from "./auth.utils"
import { setInitialize, setStaff } from "../redux/auth/auth.slice"
import { AuthStaffType } from "../types/staff.types"
import axios from "../utils/axios"

type Props = {
    children: ReactNode
}

export default function InitializeAuth({ children }: Props) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const authStaff: AuthStaffType | null = getSession()
        if (authStaff?.token && isValidToken(authStaff.token)) {
            // בדיקה האם הטוקן שווה לנתוני היוזר
            axios.defaults.headers.common.Authorization = `Bearer ${authStaff.token}`;
            dispatch(setStaff(authStaff.staff))
        }
        dispatch(setInitialize())
    }, [])

    return <>{children}</>
}