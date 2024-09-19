import { createContext, useContext, useReducer, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const userReducer = (users, action) => {
    switch (action.type) {
        case 'setUsers':
            return action.payload
        default:
            return users
    }
}
export const UsersContext = createContext()

export const useGetById = () => {
    const usersAndDispatch = useContext(UsersContext)
    const users = usersAndDispatch[0]
    return (id) => {
        return users.find((user) => user.id === id)
    }
}
export const useUsersValue = () => {
    const usersAndDispatch = useContext(UsersContext)
    return usersAndDispatch[0]
}
export const useUsersDispatch = () => {
    const usersAndDispatch = useContext(UsersContext)
    return usersAndDispatch[0]
}

export const UsersContextProvider = ({ children }) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: userService.getAll,
        refetchOnWindowFocus: false,
        retry: 1,
    })
    const [users, usersDispatch] = useReducer(userReducer, [])
    useEffect(() => {
        if (data) {
            usersDispatch({ type: 'setUsers', payload: data })
        }
    }, [data])

    if (isLoading) return <p>Loading...</p>
    if (error)
        return (
            <p>
                Error: {'users service not available due to problems in server'}
            </p>
        )

    return (
        <UsersContext.Provider value={[users, usersDispatch]}>
            {children}
        </UsersContext.Provider>
    )
}
