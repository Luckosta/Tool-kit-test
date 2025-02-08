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

export const GET_REPOSITORY_DETAILS = gql`
    query GetRepositoryDetails($id: ID!) {
        node(id: $id) {
            ... on Repository {
                id
                name
                stargazerCount
                updatedAt
                url
                description
                owner {
                    avatarUrl
                    login
                    url
                }
                languages(first: 10) {
                    edges {
                        node {
                            name
                        }
                    }
                }
            }
        }
    }
`
