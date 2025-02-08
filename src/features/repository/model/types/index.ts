export interface GetRepositoryDetailsVars {
    id: string
}

export interface RepositoryOwner {
    avatarUrl?: string
    login: string
    url: string
}

export interface Languages {
    edges: {
        node: {
            name: string
            __typename: string
        }
    }[]
}

export interface Repository {
    __typename: 'Repository'
    id: string
    name: string
    stargazerCount: number
    updatedAt: string
    url: string
    description?: string
    owner: RepositoryOwner
    languages: Languages
}

export interface GetRepositoryDetailsData {
    node: Repository | null
}
