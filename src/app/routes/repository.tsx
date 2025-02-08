import { lazy } from 'react';

import { paths } from '@shared/model/const/paths';

const ReposPage = lazy(() => import('@pages/repository/ui'));


export const repositoryRoutes = {
    path: paths.repository,
    element: <ReposPage />,
}