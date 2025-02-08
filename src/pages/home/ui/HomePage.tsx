import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useLazyQuery } from '@apollo/client'

import { setRepositoriesData } from '@features/repositories-list/model/store'
import {
    GetRepositoriesData,
    GetRepositoriesVars,
} from '@features/repositories-list/model/types'
import { RepositoryList } from '@features/repositories-list/ui/RepositoryList'
import { GET_REPOSITORIES } from '@shared/api/repositories-list-queries'
import { DEBOUNCE_TIMER } from '@shared/model/const/timers'
import { debounce } from '@shared/model/utils/debounce'

import styles from './HomePage.module.css'

export const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get('query') || 'react')

    const [trigger, { loading, error, data }] = useLazyQuery<
        GetRepositoriesData,
        GetRepositoriesVars
    >(GET_REPOSITORIES)

    useEffect(() => {
        setRepositoriesData({
            data,
            loading,
            error: error ? error.message : null,
        })
    }, [data, loading, error])

    const debouncedQuery = useMemo(
        () =>
            debounce(async (q: string) => {
                await trigger({
                    variables: { query: q, first: 10, after: null },
                })
            }, DEBOUNCE_TIMER),
        [trigger]
    )

    useEffect(() => {
        setSearchParams({ query })
        debouncedQuery(query)
    }, [debouncedQuery, query, setSearchParams])

    return (
        <div className={styles.wrapper}>
            <input
                className={styles.input}
                type="text"
                placeholder="Поиск репозиториев"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <RepositoryList />
        </div>
    )
}
