import { basePath } from '@shared/model/const/paths'
import { useState } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { appRouteTree } from './routes/router-tree'



const createAppRouter = () =>
    createBrowserRouter(appRouteTree, { basename: basePath })


function App() {
    const [count, setCount] = useState(0)

    return (
        <div></div>
    )
}

export default App
