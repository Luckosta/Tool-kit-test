import { createStore, createEvent } from 'effector';

export const increment = createEvent<number>();

export const $counter = createStore<number>(0).on(
    increment,
    (state, payload) => state + payload,
);
