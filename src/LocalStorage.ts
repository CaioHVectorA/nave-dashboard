export function setLocalStorage(key: string, data: any) {
    let finalData = data;
    if (typeof data === 'object') {
        finalData = JSON.stringify(data) as string
    }
        localStorage.setItem(key, finalData)
}
export function getLocalStorage(key: string) {
    const g = localStorage.getItem
    if (!g(key)) return null
    const d = g(key) as string
    try {
        const r = JSON.parse(d)
        return r
    } catch (error) {
        return d
    }
}