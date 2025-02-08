import { useQuery } from '@apollo/client'
import { repositoriesFetched } from '@features/repositories-list/model/store'
import {
    GetRepositoriesData,
    GetRepositoriesVars,
} from '@features/repositories-list/model/types'
import { RepositoryList } from '@features/repositories-list/ui/RepositoryList'
import { GET_REPOSITORIES } from '@shared/api/repositories-list-queries'
import { useEffect, useMemo, useState } from 'react'
import styles from './HomePage.module.css'
import { debounce } from '@shared/model/utils/debounce'
import { DEBOUNCE_TIMER } from '@shared/model/const/timers'

export const HomePage = () => {
    const [query, setQuery] = useState('react')

    const { loading, error, data, refetch } = useQuery<
        GetRepositoriesData,
        GetRepositoriesVars
    >(GET_REPOSITORIES, {
        variables: { query, first: 10, after: null },
    })

    useEffect(() => {
        if (data) {
            repositoriesFetched({
                data,
                loading,
                error: error ? error.message : null,
            })
        }
    }, [data])

    const handleSearch = useMemo(
        () =>
            debounce(() => {
                refetch({ query, first: 10, after: null })
            }, DEBOUNCE_TIMER),
        [refetch, DEBOUNCE_TIMER]
    )

    useEffect(() => {
        handleSearch()
    }, [query, handleSearch])

    return (
        <div className={styles.wrapper}>
            <input
                className={styles.input}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <RepositoryList />
        </div>
    )
}
