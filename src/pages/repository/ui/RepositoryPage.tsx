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

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1)
        } else {
            navigate('/')
        }
    }

    return (
        <div data-testid="repository" className={styles.wrapper}>
            <button
                data-testid="repository-back"
                onClick={handleBack}
                className={styles.backButton}
            >
                ← Назад
            </button>
            <Card>
                <div className={styles.header}>
                    <a
                        href={data?.node?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.repoName}
                        data-testid="repository-title"
                    >
                        {data?.node?.name}
                    </a>
                    <span
                        data-testid="repository-stars"
                        className={styles.stars}
                    >
                        ⭐ {data?.node?.stargazerCount}
                    </span>
                </div>

                <div className={styles.owner}>
                    {data?.node?.owner?.avatarUrl && (
                        <img
                            data-testid="repository-owner-avatar"
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
                        data-testid="repository-owner-name"
                    >
                        {data?.node?.owner?.login}
                    </a>
                </div>

                <div
                    data-testid="repository-commit-date"
                    className={styles.updatedAt}
                >
                    Последний коммит:{' '}
                    {new Date(data?.node?.updatedAt).toLocaleDateString()}
                </div>

                <div
                    data-testid="repository-languages"
                    className={styles.languages}
                >
                    Используемые языки:{' '}
                    {languages && languages.length > 0
                        ? languages.join(', ')
                        : 'не указаны'}
                </div>
            </Card>
        </div>
    )
}
