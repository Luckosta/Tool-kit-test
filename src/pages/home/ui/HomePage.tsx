import { useQuery } from '@apollo/client'
import { repositoriesFetched } from '@features/repositories-list/model/store/intex'
import {
    GetRepositoriesData,
    GetRepositoriesVars,
} from '@features/repositories-list/model/types'
import { RepositoryList } from '@features/repositories-list/ui/RepositoryList'
import { GET_REPOSITORIES } from '@shared/api/repositories-list-queries'
import { useEffect } from 'react'

export const HomePage = () => {
    const { loading, error, data } = useQuery<
        GetRepositoriesData,
        GetRepositoriesVars
    >(GET_REPOSITORIES, {
        variables: { query: 'react', first: 10, after: null },
    })

    useEffect(() => {
        if (data) {
            repositoriesFetched(data)
        }
    }, [data])

    return (
        <div>
            <RepositoryList data={data} loading={loading} error={error} />
        </div>
    )
}
