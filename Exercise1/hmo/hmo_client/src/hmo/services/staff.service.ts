import { StaffType } from "../types/staff.types"
import axios from "../utils/axios"

export const addStaff = async (staff: StaffType) => {
    const response = await axios.post('/staff', staff)
    const res = await response.data
    return res
}