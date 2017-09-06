const initialState = {
    images: [null, null, null],
    error: null,
    isLoading: false
}

const image = (state=initialState, action) => {
    let images

    switch (action.type) {
        case 'UPLOAD_IMAGE':
            return {
                ...state,
                isLoading: true
            }
        case 'UPLOAD_IMAGE_SUCCESS':
            images = [...state.images]

            images[action.payload.index] = action.payload.image

            return {
                ...state,
                images,
                error: null,
                isLoading: false
            }
        case 'UPLOAD_IMAGE_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case 'REMOVE_IMAGE':
            return {
                ...state,
                isLoading: true
            }
        case 'REMOVE_IMAGE_SUCCESS':
            images = [...state.images]

            images[action.payload] = null

            return {
                ...state,
                images,
                error: null,
                isLoading: false
            }
        case 'REMOVE_IMAGE_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case 'ADD_RESIZED':
            return {
                ...state,
                isLoading: true
            }
        case 'ADD_RESIZED_SUCCESS':
            images = [...state.images]

            images[action.payload.index].resized =
                action.payload.response.data.updateFile.resized

            return {
                ...state,
                images,
                error: null,
                isLoading: false
            }
        case 'ADD_RESIZED_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default image