import { getLocalStorage, setLocalStorage } from "@/LocalStorage"
import { setCSSVar } from "./setCSSVar"
import { LOCAL_STORAGE } from "../consts"

const lightMode = {
    '--dark-blue': '#221B66',
    '--sample-blue': '#4032C5',
    '--gray-blue': '#57518A',
    '--action-blue': '#392CA7',
    '--bg': '#FFF',
    '--sub-bg': '#F2F2F2',
    '--text': '#202020',
}
const darkMode = {
    '--dark-blue': '#3100a5',    
    '--sample-blue': '#00F',     
    '--gray-blue': '#89b6d4',    
    '--action-blue': '#399fda',  
    '--bg': '#080808',   
    '--sub-bg': '#202020',       
    '--text': '#D9D9D9',
}

export function changeTheme() {
    let defaultValue = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'DARK' : 'LIGHT'
    const ls = getLocalStorage(LOCAL_STORAGE.USER_THEME)
    if (ls) defaultValue = ls
    const name = defaultValue === 'DARK' ? 'LIGHT' : 'DARK'
    let obj = defaultValue === 'DARK' ? lightMode : darkMode
    let newTheme = defaultValue !== 'DARK' ? lightMode : darkMode
    Object.keys(obj).forEach((value, index) => {
        setCSSVar(value, Object.values(newTheme)[index])
    })
    setLocalStorage(LOCAL_STORAGE.USER_THEME,name)
}

export function setTheme(isDark: boolean) {
    let obj = isDark ? lightMode : darkMode
    let newTheme = !isDark ? lightMode : darkMode
    Object.keys(obj).forEach((value, index) => {
        setCSSVar(value, Object.values(newTheme)[index])
    })
}