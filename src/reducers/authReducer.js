import { SIGN_IN, SIGN_OUT } from '../actions/types';

export default (state = {}, action) => {

    switch (action.type) {
        case SIGN_IN:
            if (action.payload) {
                return {...state, errorMessage: action.payload};
            } else {
                return {...state, errorMessage: null};
            }
        case SIGN_OUT:
            if (action.payload){
                return {...state, errorMessage: action.payload};
            } else {
                return {...state, errorMessage: null};
            }
        default:
            return state;
    }
};