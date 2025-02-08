import { GetRepositoriesData } from '@features/repositories-list/model/types'

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
        <ul>
            {data?.search.edges.map(({ node }) => (
                <li key={node.id}>
                    <a
                        href={node.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {node.name}
                    </a>{' '}
                    – Звёзды: {node.stargazerCount} – Обновлено:{' '}
                    {new Date(node.updatedAt).toLocaleDateString()}
                </li>
            ))}
        </ul>
    )
}
