import { getLocalStorage } from "@/LocalStorage"
import { LOCAL_STORAGE } from "../consts"

type UserProps = {
    token: string,
    email: string,
    name: string,
    role: string,
}
type hresponse = UserProps  & { isErrored: boolean} 
export const useUser: () => hresponse = () => {
    let response: hresponse = {
        email: '',
        name: '',
        role: '',
        token: '',
        isErrored: false,
    }
    const data = getLocalStorage(LOCAL_STORAGE.USER_DATA) as null | UserProps
    if (data) return {...data, isErrored: false}
    return {...response, isErrored: true}
}