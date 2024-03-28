import { AuthStaffType } from "../types/staff.types";
import axios from "../utils/axios";

export const setSession = (staff: AuthStaffType) => {
    localStorage.setItem('authStaff', JSON.stringify(staff))
    axios.defaults.headers.common.Authorization = `Bearer ${staff.token}`;
}

export const getSession = (): AuthStaffType | null => {
    const user = JSON.parse(localStorage.getItem('authStaff') || 'null')
    return user
}

export function jwtDecode(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    );

    return JSON.parse(jsonPayload);
}


export const isValidToken = (token: string) => {
    if (!token) {
        return false;
    }

    const decoded = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};
