import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
    query GetRepositories($query: String!, $first: Int!, $after: String) {
        search(query: $query, type: REPOSITORY, first: $first, after: $after) {
            repositoryCount
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                node {
                    ... on Repository {
                        id
                        name
                        stargazerCount
                        updatedAt
                        url
                    }
                }
            }
        }
    }
`
