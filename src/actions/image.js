import config from './../config'

export const uploadImage = (index, body) => dispatch => {
    dispatch({
        type: 'UPLOAD_IMAGE'
    })

    return fetch(`https://api.graph.cool/file/v1/${config.graphProjectId}`, {
        method: 'POST',
        body
    })
        .then(
            res => res.json(),
            error => {
                dispatch({
                    type: 'UPLOAD_IMAGE_ERROR',
                    payload: error
                })
            }
        )
        .then(image => {
            dispatch({
                type: 'UPLOAD_IMAGE_SUCCESS',
                payload: {
                    index,
                    image
                }
            })
        })
}

export const removeImage = (action, id, index) => dispatch => {
    dispatch({
        type: 'REMOVE_IMAGE'
    })

    return Promise.resolve()
        .then(() => action(id))
        .then(
            () => {
                dispatch({
                    type: 'REMOVE_IMAGE_SUCCESS',
                    payload: index
                })
            },
            error => {
                dispatch({
                    type: 'REMOVE_IMAGE_ERROR',
                    payload: error
                })
            }
        )
}

export const addResized = (action, id, resized, index) => dispatch => {
    dispatch({
        type: 'ADD_RESIZED'
    })

    return Promise.resolve()
        .then(() => action(id, resized))
        .then(
            response => {
                dispatch({
                    type: 'ADD_RESIZED_SUCCESS',
                    payload: {
                        index,
                        response
                    }
                })
            },
            error => {
                dispatch({
                    type: 'ADD_RESIZED_ERROR',
                    payload: error
                })
            }
        )
}
