import { Outlet } from 'react-router-dom'

import styles from './Layout.module.css'

import { ErrorBoundary } from '../ErrorBoundary'

export const Layout = () => {
    const renderFallback = (
        <h1>Что-то пошло не так. Попробуйте перезагрузить страницу.</h1>
    )

    return (
        <ErrorBoundary fallback={renderFallback}>
            <div className={styles.wrapper}>
                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </ErrorBoundary>
    )
}
