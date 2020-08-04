import { SIGN_IN, SIGN_OUT, SHOW_ERROR } from '../actions/types';
const INITIAL_STATE = {
    errorMessage: null
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SIGN_IN:
            return {...state, errorMessage: null};
        case SHOW_ERROR:
            return {...state, errorMessage: action.payload};
        case SIGN_OUT:
            return {...state, errorMessage: null};
        default:
            return INITIAL_STATE;
    }
};