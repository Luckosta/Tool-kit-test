import { Link } from 'react-router-dom'

import { RepositoryItemType } from '@features/repositories-list/model/types'

import styles from './RepositoryItem.module.css'

export const RepositoryItem = ({
    id,
    url,
    name,
    stargazerCount,
    updatedAt,
}: RepositoryItemType) => (
    <div className={styles.item}>
        <h2>
            <Link to={`/repository/${id}`}>{name}</Link>
        </h2>

        <p>Звёзды: {stargazerCount} ⭐</p>
        <p>Обновлено: {new Date(updatedAt).toLocaleDateString()}</p>

        <a className={styles.link} href={url} target="_blank" rel="noreferrer">
            {url}
        </a>
    </div>
)
