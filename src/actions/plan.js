export const createPlan = (action, plans) => dispatch => {
    dispatch({
        type: 'CREATE_PLAN'
    })

    const promises = plans.map(plan => action(plan))

    return Promise.all(promises)
        .then(
            () => {
                dispatch({
                    type: 'CREATE_PLAN_SUCCESS'
                })
            },
            error => {
                dispatch({
                    type: 'CREATE_PLAN_ERROR',
                    payload: error
                })
            }
        )
}