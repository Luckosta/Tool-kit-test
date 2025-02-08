import { useNavigate, useParams } from 'react-router-dom'

import { useQuery } from '@apollo/client'

import {
    GetRepositoryDetailsData,
    GetRepositoryDetailsVars,
} from '@features/repository/model/types'
import { GET_REPOSITORY_DETAILS } from '@shared/api/queries'

import styles from './RepositoryPage.module.css'

export const RepositoryPage = () => {
    const { id = '' } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { loading, error, data } = useQuery<
        GetRepositoryDetailsData,
        GetRepositoryDetailsVars
    >(GET_REPOSITORY_DETAILS, {
        variables: { id: id },
        fetchPolicy: 'no-cache',
    })

    if (loading) return <p>Загрузка деталей репозитория...</p>
    if (error) return <p>Ошибка: {error.message}</p>
    if (!id || !data?.node) return <p>Репозиторий не найден</p>

    return (
        <div className={styles.wrapper}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
                ← Назад
            </button>
            <div className={styles.card}>
                <div className={styles.header}>
                    <a
                        href={data?.node?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.repoName}
                    >
                        {data?.node?.name}
                    </a>
                    <span className={styles.stars}>
                        ⭐ {data?.node?.stargazerCount}
                    </span>
                </div>

                <div className={styles.owner}>
                    {data?.node?.owner?.avatarUrl && (
                        <img
                            src={data?.node?.owner?.avatarUrl}
                            alt={`${data?.node?.owner?.login} avatar`}
                            className={styles.avatar}
                        />
                    )}
                    <a
                        href={data?.node?.owner?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.ownerName}
                    >
                        {data?.node?.owner?.login}
                    </a>
                </div>

                <div className={styles.updatedAt}>
                    Последний коммит:{' '}
                    {new Date(data?.node?.updatedAt).toLocaleDateString()}
                </div>

                <div className={styles.languages}>
                    Используемые языки:{' '}
                    {data?.node?.languages?.edges &&
                    data.node.languages.edges.length > 0
                        ? data?.node?.languages.edges
                              .map(({ node }) => node.name)
                              .join(', ')
                        : 'не указаны'}
                </div>
            </div>
        </div>
    )
}
