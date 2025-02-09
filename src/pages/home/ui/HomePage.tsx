import { useRepositoriesListData } from '@features/repositories-list/hooks/useRepositoiresListData'
import { RepositoryList } from '@features/repositories-list/ui/RepositoryList'
import { MAX_PAGES_TO_SHOW } from '@shared/model/const/paginator'
import { Paginator } from '@shared/model/ui/Paginator'

import styles from './HomePage.module.css'

export const HomePage = () => {
    const {
        data,
        query,
        currentPage,
        totalPages,
        handlePageChange,
        handleSearch,
    } = useRepositoriesListData()

    const renderPaginator = () => {
        if (
            !data?.search?.repositoryCount ||
            data.search.repositoryCount <= MAX_PAGES_TO_SHOW ||
            totalPages === 0
        ) {
            return null
        }

        return (
            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        )
    }

    return (
        <div className={styles.wrapper}>
            <input
                className={styles.input}
                type="text"
                placeholder="Поиск репозиториев"
                value={query}
                onChange={handleSearch}
            />

            <RepositoryList />

            {renderPaginator()}
        </div>
    )
}
