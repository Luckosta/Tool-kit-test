import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useLazyQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '@shared/api/queries'
import { MAX_PAGES_TO_SHOW } from '@shared/model/const/paginator'
import { DEBOUNCE_TIMER } from '@shared/model/const/timers'
import { debounce } from '@shared/model/utils/debounce'

import { setRepositoriesData } from '../model/store'
import { GetRepositoriesData, GetRepositoriesVars } from '../model/types'

export const useRepositoriesListData = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get('query') || 'react')
    const [currentPage, setCurrentPage] = useState(
        Number(searchParams.get('page')) || 1
    )
    const [pageCursors, setPageCursors] = useState<{
        [page: number]: string | null
    }>({ 1: null })

    const [trigger, { loading, error, data, refetch }] = useLazyQuery<
        GetRepositoriesData,
        GetRepositoriesVars
    >(GET_REPOSITORIES, { fetchPolicy: 'no-cache' })

    const totalPages = data
        ? Math.ceil(data.search.repositoryCount / MAX_PAGES_TO_SHOW)
        : 0

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        const after = pageCursors[page] ?? null
        refetch({ query, first: MAX_PAGES_TO_SHOW, after })
    }

    const debouncedQuery = useMemo(() => {
        return debounce(async (q: string) => {
            setCurrentPage(1)
            setPageCursors({ 1: null })
            await trigger({
                variables: { query: q, first: MAX_PAGES_TO_SHOW },
            })
        }, DEBOUNCE_TIMER)
    }, [trigger])

    useEffect(() => {
        setSearchParams({ query, page: currentPage.toString() })
    }, [setSearchParams, currentPage, query])

    useEffect(() => {
        debouncedQuery(query)
    }, [query, debouncedQuery])

    useEffect(() => {
        setRepositoriesData({
            data,
            loading,
            error: error ? error.message : null,
        })

        if (data?.search.pageInfo.hasNextPage) {
            setPageCursors((prev) => ({
                ...prev,
                [currentPage + 1]: data.search.pageInfo.endCursor,
            }))
        }
    }, [data, currentPage, loading, error])

    return {
        data,
        query,
        currentPage,
        totalPages,
        setQuery,
        handlePageChange,
    }
}
