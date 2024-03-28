import { AuthStaffType } from "../types/staff.types"
import axios from "../utils/axios"

export const login = async (id: string, password: string) => {
    const data={
        id, 
        password
    }
    const response = await axios.post<AuthStaffType>(`/staff/Login`, data)
    return response.data
}