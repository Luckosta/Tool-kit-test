import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:5173/'

test.describe('Repositories', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL)
    })

    test('отображается дефолтный поисковый запрос и список репозиториев', async ({
        page,
    }) => {
        const searchInput = page.locator(
            'input[placeholder="Поиск репозиториев"]'
        )
        await expect(searchInput).toHaveValue('react')

        const repoList = page.locator('[data-testid="repository-list"]')
        await expect(repoList).toBeVisible()

        const repoItems = page.locator('[data-testid="repository-item"]')
        await expect(repoItems).toHaveCount(0)
    })

    test('при изменении запроса URL обновляется и пагинация сбрасывается', async ({
        page,
    }) => {
        const searchInput = page.locator(
            'input[placeholder="Поиск репозиториев"]'
        )
        await searchInput.fill('vue')

        await page.waitForTimeout(500)

        await expect(page).toHaveURL(/query=vue.*page=1/)
    })

    test('при клике на репозиторий происходит переход на страницу карточки репозитория', async ({
        page,
    }) => {
        const repoItem = page.locator('[data-testid="repository-link"]').first()
        await repoItem.click()

        await expect(page).toHaveURL(/\/repository\/.+/)

        const repoDetail = page.locator('[data-testid="repository"]')
        await expect(repoDetail).toBeVisible()
    })
})
