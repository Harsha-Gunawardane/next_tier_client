import * as Action from '../redux/resultSlice'

export const PutAnswer = (trace, result) => async (dispatch) => {
    try {
        await dispatch(Action.putResult({trace, result}))
    } catch (error) {
        console.log(error)
    }
}
