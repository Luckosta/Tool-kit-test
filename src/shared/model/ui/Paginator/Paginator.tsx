import styles from './Paginator.module.css'

interface PaginatorProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const Paginator = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginatorProps) => {
    const maxPagesToShow = 10
    let startPage: number
    let endPage: number

    if (totalPages <= maxPagesToShow) {
        startPage = 1
        endPage = totalPages
    } else {
        const half = Math.floor(maxPagesToShow / 2)
        if (currentPage <= half) {
            startPage = 1
            endPage = maxPagesToShow
        } else if (currentPage + half - 1 >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1
            endPage = totalPages
        } else {
            startPage = currentPage - half + 1
            endPage = startPage + maxPagesToShow - 1
        }
    }

    const pages: number[] = []
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
    }

    return (
        <div className={styles.paginator}>
            {pages.map((page) => (
                <button
                    key={page}
                    className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    )
}

export default Paginator
