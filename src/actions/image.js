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
