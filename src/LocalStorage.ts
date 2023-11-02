import hasWindow from "./util/func/hasWindow";

export function setLocalStorage(key: string, data: any) {
    if(!hasWindow()) return
    let finalData = data;
    if (typeof data === 'object') {
        finalData = JSON.stringify(data) as string
    }
    localStorage.setItem(key, finalData)
}
export function getLocalStorage(key: string) {
    if(!hasWindow()) return
    if (!localStorage.getItem(key)) return null
    const d = localStorage.getItem(key) as string
    try {
        const r = JSON.parse(d)
        return r
    } catch (error) {
        return d
    }
}