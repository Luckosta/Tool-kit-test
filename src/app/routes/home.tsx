import { lazy } from 'react';

import { paths } from '@shared/model/const/paths';

const HomePage = lazy(() => import('@pages/home/ui'));


export const homeRoutes = {
    path: paths.home,
    element: <HomePage />,
}