import { useNavigate, useParams } from 'react-router-dom'

import { useQuery } from '@apollo/client'

import {
    GetRepositoryDetailsData,
    GetRepositoryDetailsVars,
} from '@features/repository/model/types'
import { GET_REPOSITORY_DETAILS } from '@shared/api/queries'
import { Card } from '@shared/model/ui/Card'

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

    const languages = data?.node?.languages?.edges?.map(({ node }) => node.name)

    return (
        <div className={styles.wrapper}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
                ← Назад
            </button>
            <Card>
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
                    {languages && languages.length > 0
                        ? languages.join(', ')
                        : 'не указаны'}
                </div>
            </Card>
        </div>
    )
}
