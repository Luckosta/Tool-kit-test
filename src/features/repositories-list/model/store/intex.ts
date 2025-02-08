import { createStore, createEvent } from 'effector'
import { GetRepositoriesData, RepositoriesState } from '../types'

export const repositoriesFetched = createEvent<GetRepositoriesData>()

export const $repositories = createStore<GetRepositoriesData | null>(null).on(
    repositoriesFetched,
    (_, payload) => payload
)

export const repositoryStateUpdated = createEvent<Partial<RepositoriesState>>()

export const $repositoryState = createStore<RepositoriesState>({
    data: null,
    loading: false,
    error: null,
}).on(repositoryStateUpdated, (state, payload) => ({
    ...state,
    ...payload,
}))
