import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StaffType } from "../../types/staff.types";

type AuthStateType = {
    staff: StaffType | null,
    isAuthanticated: boolean,
    isInitialized: boolean
}

const initialState = {
    staff: null,
    isAuthanticated: false,
    isInitialized: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setStaff: (state: AuthStateType, action: PayloadAction<StaffType>) => {
            state.staff = action.payload;
            state.isAuthanticated = true
        },
        setInitialize: (state: AuthStateType) => {
            state.isInitialized = true
        }
    }
})

export const { setStaff, setInitialize } = authSlice.actions
export default authSlice.reducer