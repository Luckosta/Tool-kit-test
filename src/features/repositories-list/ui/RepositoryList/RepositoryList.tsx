import { useUnit } from 'effector-react'

import { $repositories } from '@features/repositories-list/model/store'

import styles from './RepositoryList.module.css'

import { RepositoryItem } from '../RepositoryItem'

export const RepositoryList = () => {
    const state = useUnit($repositories)

    if (state?.loading) return <p>Загрузка...</p>

    if (state?.error) return <p>Ошибка: {state.error}</p>

    return (
        <div className={styles.list}>
            {state?.data?.search.edges.map(({ node }) => (
                <RepositoryItem key={node.id} {...node} />
            ))}
        </div>
    )
}
