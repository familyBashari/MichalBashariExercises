
export type StaffType = {
    id:string,
    firstName:string,
    lastName:string,
    password: string
}

export type AuthStaffType = {
    staff: StaffType,
    token: string
}