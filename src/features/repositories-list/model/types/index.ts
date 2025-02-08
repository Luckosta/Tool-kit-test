export interface RepositoryItemType {
    id: string
    name: string
    stargazerCount: number
    updatedAt: string
    url: string
}

export interface GetRepositoriesData {
    search: {
        repositoryCount: number
        pageInfo: {
            endCursor: string
            hasNextPage: boolean
        }
        edges: {
            node: RepositoryItemType
        }[]
    }
}

export interface GetRepositoriesVars {
    query: string
    first: number
    after?: string | null
}


export interface RepositoriesState {
    data?: GetRepositoriesData | null
    loading?: boolean
    error?: string | null
}