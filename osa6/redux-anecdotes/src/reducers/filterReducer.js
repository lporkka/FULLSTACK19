


export const setFilter = text => {
    console.log(text)
    return {
        type: 'FILTER',
        text
    }
}


const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER':
            return action.text
        default:
            return state
    }
}

export default filterReducer