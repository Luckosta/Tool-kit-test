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
import Paginator from '@shared/model/ui/Paginator/Paginator'
import { debounce } from '@shared/model/utils/debounce'

import styles from './HomePage.module.css'

export const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get('query') || 'react')
    const [currentPage, setCurrentPage] = useState(1)

    const [trigger, { loading, error, data }] = useLazyQuery<
        GetRepositoriesData,
        GetRepositoriesVars
    >(GET_REPOSITORIES, { fetchPolicy: 'no-cache' })

    const totalPages = data ? Math.ceil(data.search.repositoryCount / 10) : 0

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        const after = page === 1 ? null : undefined
        trigger({ variables: { query, first: 10, after } })
    }

    const debouncedQuery = useMemo(
        () =>
            debounce(async (q: string) => {
                setCurrentPage(1)
                await trigger({
                    variables: { query: q, first: 10, after: null },
                })
            }, DEBOUNCE_TIMER),
        [trigger]
    )

    useEffect(() => {
        setRepositoriesData({
            data,
            loading,
            error: error ? error.message : null,
        })
    }, [data, loading, error, currentPage])

    useEffect(() => {
        setSearchParams({ query })
        debouncedQuery(query)
    }, [debouncedQuery, query, setSearchParams])

    const renderPaginator = () => {
        const value = data?.search?.edges
        if (!value || value.length === 0 || loading || error) {
            return
        }

        return (
            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        )
    }

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

            {renderPaginator()}
        </div>
    )
}
