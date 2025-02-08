import { Navigate } from 'react-router-dom';

import { Layout } from '@shared/components/Layout';

import { routes } from '.';

export const getRedirect = (path: string, route: string) => {
    const element = <Navigate to={route} replace />;

    return {
        path,
        element,
    };
};

export const appRouteTree = [
    {
        element: <Layout />,
        children: [routes.homeRoutes, routes.repositoryRoutes],
    },
];
