import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './context/NotificationContext'
import { BlogContextProvider } from './context/BlogContext'
import { UsersContextProvider } from './context/UsersContext'
import { UserContextProvider } from './context/UserContext'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <QueryClientProvider client={queryClient}>
            <NotificationContextProvider>
                <UsersContextProvider>
                    <UserContextProvider>
                        <BlogContextProvider>
                            <App />
                        </BlogContextProvider>
                    </UserContextProvider>
                </UsersContextProvider>
            </NotificationContextProvider>
        </QueryClientProvider>
    </Router>,
)
