import { describe, it, expect } from 'vitest'

import { usePaginatorCalculate } from '../usePaginatorCalculate'

describe('usePaginatorCalculate', () => {
    it('возвращает [1] если totalPages меньше или равен 1', () => {
        expect(usePaginatorCalculate(0, 1).pages).toEqual([1])
        expect(usePaginatorCalculate(1, 1).pages).toEqual([1])
    })

    it('возвращает [1, 2] если totalPages равно 2', () => {
        expect(usePaginatorCalculate(2, 1).pages).toEqual([1, 2])
        expect(usePaginatorCalculate(2, 2).pages).toEqual([1, 2])
    })

    it('возвращает [1, 2] если totalPages > 2 и currentPage равна 1', () => {
        expect(usePaginatorCalculate(5, 1).pages).toEqual([1, 2])
    })

    it('возвращает [totalPages-2, totalPages-1, totalPages] если currentPage равна totalPages', () => {
        expect(usePaginatorCalculate(5, 5).pages).toEqual([3, 4, 5])
        expect(usePaginatorCalculate(10, 10).pages).toEqual([8, 9, 10])
    })

    it('возвращает [currentPage-1, currentPage, currentPage+1] если currentPage находится посередине', () => {
        expect(usePaginatorCalculate(5, 3).pages).toEqual([2, 3, 4])
        expect(usePaginatorCalculate(10, 5).pages).toEqual([4, 5, 6])
    })
})
