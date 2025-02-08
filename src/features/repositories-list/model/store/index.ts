import { createStore, createEvent } from 'effector'
import { RepositoriesState } from '../types'

export const repositoriesFetched = createEvent<RepositoriesState>()

export const $repositories = createStore<RepositoriesState | null>(null).on(
    repositoriesFetched,
    (_, payload) => payload
)
