import { SHOW_MODAL } from '../actions/types';

export default (modal = 'ui dimmer modals visible' , action) => {
    if (action.type  === SHOW_MODAL) {
        return action.payload;
    }
    return modal;
};