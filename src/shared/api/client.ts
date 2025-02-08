import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
        authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
})

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})
