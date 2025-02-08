import * as homeRoutes from './home';
import * as repositoryRoutes from './repository';

export const routes = {
    ...homeRoutes,
    ...repositoryRoutes,
};
