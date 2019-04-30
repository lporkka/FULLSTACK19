
export const setNotification = message => {
    return {
        type: 'SETNOTIFICATION',
        data: { message }
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVENOTIFICATION'
    }
}


const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SETNOTIFICATION':
            return action.data.message
        case 'REMOVENOTIFICATION':
            return null
        default:
            return state
    }
}


export default notificationReducer