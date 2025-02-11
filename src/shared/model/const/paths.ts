export const basePath = '/'

export const paths = {
    home: basePath,
    repository: `${basePath}repository/:id`,
} as const
