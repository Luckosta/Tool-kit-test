import { RepositoryItemType } from '@features/repositories-list/model/types'

import styles from './RepositoryItem.module.css'

export const RepositoryItem = ({
    url,
    name,
    stargazerCount,
    updatedAt,
}: RepositoryItemType) => {
    return (
        <div className={styles.item}>
            <h2>{name}</h2>

            <p>Звёзды: {stargazerCount}</p>
            <p>Обновлено: {new Date(updatedAt).toLocaleDateString()}</p>

            <a className={styles.link} href={url} target="_blank" rel="noreferrer">
                {url}
            </a>
        </div>
    )
}
