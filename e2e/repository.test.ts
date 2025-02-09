import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:5173'

test.describe('Repository Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/repository/R_kgDOLeiInA`)
    })

    test('отображаются основные данные репозитория', async ({ page }) => {
        const repoTitle = page.locator('[data-testid="repository-title"]')
        await expect(repoTitle).toBeVisible()
        const stars = page.locator('[data-testid="repository-stars"]')
        await expect(stars).toBeVisible()

        const ownerAvatar = page.locator(
            '[data-testid="repository-owner-avatar"]'
        )
        await expect(ownerAvatar).toBeVisible()

        const ownerName = page.locator('[data-testid="repository-owner-name"]')
        await expect(ownerName).toBeVisible()
        await expect(ownerName).toHaveAttribute('href', /github\.com/)

        const commitDate = page.locator(
            '[data-testid="repository-commit-date"]'
        )
        await expect(commitDate).toBeVisible()

        const languages = page.locator('[data-testid="repository-languages"]')
        await expect(languages).toBeVisible()
    })

    test('при клике на кнопку "Назад" происходит переход на список репозиториев', async ({
        page,
    }) => {
        const backButton = page.locator('[data-testid="repository-back"]')
        await expect(backButton).toBeVisible()

        await backButton.click()
        const repoList = page.locator('[data-testid="repository-list"]')
        await expect(repoList).toBeVisible()
    })
})
