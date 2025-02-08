import { paths } from '@shared/model/const/paths';
import { lazy } from 'react';

const ReposPage = lazy(() => import('@pages/repository'));


export const repositoryRoutes = {
    path: paths.repository,
    element: <ReposPage />,
}