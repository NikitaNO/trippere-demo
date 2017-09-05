const initialState = {
    images: [null, null, null],
    error: null,
    isLoading: false
}

const image = (state=initialState, action) => {
    switch (action.type) {
        case 'UPLOAD_IMAGE':
            return {
                ...state,
                isLoading: true
            }
        case 'UPLOAD_IMAGE_SUCCESS':
            const images = [...state.images]

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
        default:
            return state
    }
}

export default image