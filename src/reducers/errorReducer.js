import { SHOW_ERROR } from '../actions/types';
import history from '../history';
const INITIAL_STATE = {
    errorMessage: null
}

export default (state = INITIAL_STATE, action) => {
    if(action.type === SHOW_ERROR){
        if (action.payload.status === 401) {
            localStorage.removeItem('token');
            history.push('/signin');
            return {...state};
        } else {
            return {...state, errorMessage: action.payload.data.error.message};
        }
    }
    return INITIAL_STATE;
};