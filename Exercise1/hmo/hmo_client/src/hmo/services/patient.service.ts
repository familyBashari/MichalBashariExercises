import axios from "../utils/axios"
import { PatientType } from "../types/patient.types"


export const getPatients = async () => {
    const response = await axios.get('/patient')
    const patients = await response.data
    return patients
}

export const getImageById = async (id: string): Promise<Blob> => {
    const response = await axios.get(`/patient/image/${id}`, { responseType: 'blob' });
    return response.data;
};

export const addPatient = async (patient: FormData) => {
    const response = await axios.post('/patient', patient)
    const res = await response.data
    return res
}

export const updatePatient = async (patient: PatientType) => {
    console.log(patient)
    console.log(patient.id)
    const response = await axios.put(`/patient/`, patient)
    const res =await response.data
    return res
}

export const deletePatient = async (id: string) => {
    const response = await axios.delete(`/patient/${id}`)
    return response
}



// export const getPatients = async () => {
//     const response = await axios.get('/client')
//     const patients = await response.data
//     return patients
// }

// export const getImageById = async (id: string): Promise<Blob> => {
//     const response = await axios.get(`/client/image/${id}`, { responseType: 'blob' });
//     return response.data;
// };

// export const addPatient = async (patient: FormData) => {
//     const response = await axios.post('/client', patient)
//     debugger
//     const res =await response.data
//     debugger
//     return res
// }

// export const updatePatient = async (patient: PatientType) => {
//     console.log(patient)
//     console.log(patient.id)
//     const response = await axios.put(`/client/`, patient)
//     const res =await response.data
//     return res
// }

// export const deletePatient = async (id: string) => {
//     const response = await axios.delete(`/client/${id}`)
//     return response
// }

