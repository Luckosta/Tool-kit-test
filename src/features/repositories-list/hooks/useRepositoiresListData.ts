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
    const initialPage = Number(searchParams.get('page')) || 1
    const [currentPage, setCurrentPage] = useState(initialPage)
    const initialCursors = localStorage.getItem('repoPageCursors')
        ? JSON.parse(localStorage.getItem('repoPageCursors')!)
        : { 1: null }
    const [pageCursors, setPageCursors] = useState<{
        [page: number]: string | null
    }>(initialCursors)

    const [trigger, { loading, error, data }] = useLazyQuery<
        GetRepositoriesData,
        GetRepositoriesVars
    >(GET_REPOSITORIES, { fetchPolicy: 'no-cache' })

    const totalPages = data
        ? Math.ceil(data.search.repositoryCount / MAX_PAGES_TO_SHOW)
        : 0

    const handlePageChange = async (page: number) => {
        setCurrentPage(page)
        const after = page === 1 ? null : pageCursors[page] || null
        await trigger({ variables: { query, first: MAX_PAGES_TO_SHOW, after } })
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setCurrentPage(1)
        setPageCursors({ 1: null })
    }

    const debouncedQuery = useMemo(() => {
        return debounce(async (q: string) => {
            const after =
                currentPage === 1 ? null : pageCursors[currentPage] || null
            await trigger({
                variables: { query: q, first: MAX_PAGES_TO_SHOW, after },
            })
        }, DEBOUNCE_TIMER)
    }, [trigger])

    useEffect(() => {
        localStorage.setItem('repoPageCursors', JSON.stringify(pageCursors))
    }, [pageCursors])

    useEffect(() => {
        setSearchParams({
            query,
            page: currentPage.toString(),
            cursor: pageCursors[currentPage] || '',
        })
    }, [setSearchParams, query, currentPage, pageCursors])

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
        handleSearch,
        handlePageChange,
    }
}
