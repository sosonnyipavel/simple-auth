import { SIGN_IN, SIGN_OUT } from '../actions/types';
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SIGN_IN:
            return {...state};
        case SIGN_OUT:
            return {...state};
        default:
            return state;
    }
};