import { SIGN_IN, SIGN_OUT } from '../actions/types';
const INITIAL_STATE = {
    errorMessage: null
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SIGN_IN:
            if (action.payload) {
                return {...state, errorMessage: action.payload};
            } else {
                return INITIAL_STATE;
            }
        case SIGN_OUT:
            if (action.payload){
                return {...state, errorMessage: action.payload};
            } else {
                return INITIAL_STATE;
            }
        default:
            return state;
    }
};