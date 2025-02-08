export const debounce = <T extends (...args: any[]) => void>(func: T, timer: number) => {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: Parameters<T>) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), timer)
    }
}
