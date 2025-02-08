import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { basePath } from '@shared/model/const/paths'

import { appRouteTree } from './routes/router-tree'
import { ApolloProvider } from '@apollo/client'
import { client } from '@shared/api/client'
import '@shared/model/ui/global-styles.css'

const createAppRouter = () =>
    createBrowserRouter(appRouteTree, { basename: basePath })


export function App() {
    const router = createAppRouter()

    return (
		<ApolloProvider client={client}> 
			<RouterProvider router={router} />
		</ApolloProvider>
    )
}