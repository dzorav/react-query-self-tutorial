import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools"
import { BrowserRouter, Link } from 'react-router-dom'
import Routes from './Routes'

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to={`/posts`}>Post</Link>
            <Link to={`/sw`}>Star Wars</Link>
          </div>
          <Routes />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

export default App
