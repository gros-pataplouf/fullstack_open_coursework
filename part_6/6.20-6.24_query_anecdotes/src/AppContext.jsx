/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react'


const appReducer = (state, action) => {
    switch(action.type) {
        case 'VOTE':
            return `You voted ${action.payload}!`
        case 'CREATE':
            return `You created ${action.payload}!`
        case 'TIMEOUT':
            return ''
        case 'ERROR':
            return action.payload
        default:
            return state
    }
}

const AppContext = createContext()
export const AppContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(appReducer, '')
    return (
        <AppContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </AppContext.Provider>
    )
}

export const useNotificationText = () => {
    const notificationAndDispatch = useContext(AppContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(AppContext)
    return notificationAndDispatch[1];
}

export default AppContext
