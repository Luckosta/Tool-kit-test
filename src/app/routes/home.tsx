import { paths } from '@shared/model/const/paths';
import { lazy } from 'react';

const HomePage = lazy(() => import('@pages/home'));


export const homeRoutes = {
    path: paths.home,
    element: <HomePage />,
}