import React from 'react'
import { supabase } from './supabaseClient'
import Dates from './components/dates'
import './App.css'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
function App() {
    const [slots, setSlots] = React.useState(null)

    React.useEffect(() => {
        const readData = async () => {
            const { data, error } = await supabase.from('takenslots').select()
            setSlots(data)
            // if (error) console.log(error)
        }
        readData()
    }, [])
    return (
        <QueryClientProvider client={queryClient}>
            <Dates takenSlots={slots} />
        </QueryClientProvider>
    )
}
export default App
