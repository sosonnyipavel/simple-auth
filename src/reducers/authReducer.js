import { SIGN_IN, SIGN_OUT } from '../actions/types';
const INITIAL_STATE = {
    isSignedIn: null,
    userToken: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, isSignedIn: true, userToken: action.payload.session.access_token };
        case SIGN_OUT:
            return {...state, isSignedIn: false, userToken: ''};
        default:
            return state;
    }
};