import { GetRepositoriesData } from '@features/repositories-list/model/types'
import { RepositoryItem } from '../RepositoryItem'

import styles from './RepositoryList.module.css'

interface RepositoryListProps {
    data?: GetRepositoriesData
    loading: boolean
    error?: Error
}

export const RepositoryList = ({
    data,
    loading,
    error,
}: RepositoryListProps) => {
    if (loading) return <p>Загрузка...</p>
    if (error) return <p>Ошибка: {error.message}</p>

    return (
        <div className={styles.list}>
            {data?.search.edges.map(({ node }) => (
                <RepositoryItem key={node.id} {...node} />
            ))}
        </div>
    )
}
