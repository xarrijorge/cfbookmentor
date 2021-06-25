import Dates from './components/dates'
import './App.css'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Dates />
        </QueryClientProvider>
    )
}
export default App
