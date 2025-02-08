import { Navigate } from 'react-router-dom';
import { routes } from '.';
import Layout from '@shared/components/layout';

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
