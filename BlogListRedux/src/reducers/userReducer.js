import { createSlice, current } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
const initialState = null
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
    },
})
export default userSlice.reducer
export const { setUser } = userSlice.actions
export const login = (credentials) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login(credentials)
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user),
            )
            dispatch(setUser(user))
        } catch (exception) {
            dispatch(
                setNotification(
                    { type: 'error', message: 'Wrong credentials' },
                    10,
                ),
            )
        }
    }
}
export const getLoggedInUser = () => {
    return async (dispatch) => {
        const loggedInUser = window.localStorage.getItem('loggedBlogappUser')
        const user = JSON.parse(loggedInUser)
        dispatch(setUser(user))
    }
}
export const logout = () => {
    return async (dispatch) => {
        window.localStorage.clear()
        dispatch(setUser(null))
    }
}
