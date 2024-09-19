import { createContext, useContext, useReducer, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import loginService from '../services/login'
import { useNotificationDispatch } from './NotificationContext'
const userReducer = (state, action) => {
    switch (action.type) {
        case 'setUser':
            return action.payload
        case 'resetUser':
            return null
        default:
            return state
    }
}
const UserContext = createContext()

export const useLoginDispatch = () => {
    const notify = useNotificationDispatch()
    const userAndDispatch = useContext(UserContext)
    const dispatch = userAndDispatch[1]
    return async (payload) => {
        try {
            const user = await loginService.login(payload)
            dispatch({ type: 'setUser', payload: user })
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user),
            )
        } catch (exception) {
            notify({ type: 'error', message: 'Wrong credentials' }, 10)
        }
    }
}
export const useGetAuth = () => {
    const [user] = useContext(UserContext)
    return user === null ? '' : user.token
}

export const useUserValue = () => {
    const [user] = useContext(UserContext)
    return user
}

export const useLogOutDispatch = () => {
    const [, dispatch] = useContext(UserContext)
    return () => {
        dispatch({ type: 'resetUser', payload: null })
        window.localStorage.clear()
    }
}
export const UserContextProvider = (props) => {
    const savedUserStorage = window.localStorage.getItem('loggedBlogappUser')
    const [user, userDispatch] = useReducer(userReducer, null)
    useEffect(() => {
        if (savedUserStorage) {
            const savedUser = JSON.parse(savedUserStorage)
            userDispatch({ type: 'setUser', payload: savedUser })
        }
    }, [savedUserStorage])
    return (
        <UserContext.Provider value={[user, userDispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext
UserContextProvider.propTypes = {
    children: PropTypes.element,
}
