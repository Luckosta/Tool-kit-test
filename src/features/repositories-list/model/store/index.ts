import { createStore, createEvent } from 'effector'

import { RepositoriesState } from '../types'

export const setRepositoriesData = createEvent<RepositoriesState>()

export const $repositories = createStore<RepositoriesState | null>(null).on(
    setRepositoriesData,
    (_, payload) => payload
)
