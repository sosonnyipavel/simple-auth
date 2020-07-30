import { SHOW_MODAL, HIDE_MODAL } from '../actions/types';
const INITIAL_STATE = { show: 'none' }

export default (state = INITIAL_STATE , action) => {
    if (action.type  === SHOW_MODAL) {
        return action.payload;
    }
    switch(action.type) {
        case SHOW_MODAL:
            return {...state, show: action.payload};
        case HIDE_MODAL:
            return {...state, show: action.payload};
        default:
            return state;
    }
};