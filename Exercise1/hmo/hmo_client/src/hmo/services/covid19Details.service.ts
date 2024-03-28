import { Covid19DetailsType } from "../types/covid19Details.type"
import axios from "../utils/axios"

export const getCovid19 = async () => {
    const response = await axios.get(`/covid19Details`)
    const covid19Details = await response.data
    return covid19Details
}

export const getCovid19ById = async (id: string) => {
    const response = await axios.get(`/covid19Details/${id}`)
    const covid19Details = await response.data
    return covid19Details
}

export const addCovid19Api = async (co: Covid19DetailsType) => {
    const response = await axios.post('/covid19Details', co)
    const res = await response.data
    return res
}