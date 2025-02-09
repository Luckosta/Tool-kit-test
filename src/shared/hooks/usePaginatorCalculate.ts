export const usePaginatorCalculate = (
    totalPages: number,
    currentPage: number
) => {
    let pages: number[] = []

    if (totalPages <= 1) {
        pages = [1]
    } else if (totalPages === 2) {
        pages = [1, 2]
    } else {
        if (currentPage === 1) {
            pages = [1, 2]
        } else if (currentPage === totalPages) {
            pages = [totalPages - 2, totalPages - 1, totalPages]
        } else {
            pages = [currentPage - 1, currentPage, currentPage + 1]
        }
    }
    return { pages }
}
