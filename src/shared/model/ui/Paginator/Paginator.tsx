import { usePaginatorCalculate } from '@shared/hooks/usePaginatorCalculate'

import styles from './Paginator.module.css'

interface PaginatorProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const Paginator = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginatorProps) => {
    const { pages } = usePaginatorCalculate(totalPages, currentPage)

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
