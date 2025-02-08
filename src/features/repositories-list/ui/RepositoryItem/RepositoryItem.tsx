import { RepositoryItemType } from '@features/repositories-list/model/types'

export const RepositoryItem = ({
    url,
    name,
    stargazerCount,
    updatedAt,
}: RepositoryItemType) => {
    return (
        <div>
            <h2>{name}</h2>

            <p>Звёзды: {stargazerCount}</p>
            <p>Обновлено: {new Date(updatedAt).toLocaleDateString()}</p>

            <a href={url} target="_blank">
                {url}
            </a>
        </div>
    )
}
