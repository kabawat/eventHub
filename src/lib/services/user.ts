import { ServiceAccessAPI, ServiceUnAuthAPI } from "."
import URLs from "../endpoints"

// login 
export const LoginService = async (payload: any) => {
    try {
        const res = await ServiceUnAuthAPI.post(URLs?.LOGIN, payload)
        return res.data
    } catch (error) {
        throw error
    }
}
export const RegisterService = async (payload: any) => {
    try {
        const res = await ServiceUnAuthAPI.post(URLs?.REGISTER, payload)
        return res.data
    } catch (error: any) {
        throw error
    }
}
export const FetchEventsService = async (payload: any) => {
    try {
        const { page = 1 } = payload
        const res = await ServiceUnAuthAPI.get(`${URLs?.EVENTS}/?page=${page}`)
        return res.data
    } catch (error: any) {
        throw error
    }
}
export const AttendEventService = async (payload: any) => {
    try {
        const { id } = payload
        const res = await ServiceAccessAPI.post(`${URLs?.EVENTS}/${id}/attend`)
        return res.data
    } catch (error: any) {
        throw error
    }
}
export const FetchEventService = async (payload: any) => {
    try {
        const { id } = payload
        const res = await ServiceAccessAPI.get(`${URLs?.EVENTS}/${id}`)
        return res.data
    } catch (error: any) {
        throw error
    }
}