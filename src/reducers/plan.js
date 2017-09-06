const initialState = {
    isLoading: false,
    error: null
}

const plan = (state=initialState, action) => {
    switch (action.type) {
        case 'CREATE_PLAN':
            return {
                ...state,
                isLoading: true
            }
        case 'CREATE_PLAN_SUCCESS':
            return {
                ...state,
                isLoading: false
            }
        case 'CREATE_PLAN_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default plan
