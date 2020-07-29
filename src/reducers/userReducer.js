import { GET_USER, EDIT_USER } from '../actions/types';
const INITIAL_STATE = {
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    userPhone: ''
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USER:
                return ({...state, 
                    userFirstName: action.payload.first_name,
                    userLastName: action.payload.last_name,
                    userEmail: action.payload.email,
                    userPhone: action.payload.phone
                });
        case EDIT_USER:
            return ({...state});
        default:
            return state;
    }
};