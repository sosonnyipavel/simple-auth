import { GET_USER } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_USER:
                return ({...state, 
                    userPhone: action.payload.phone,
                    userFirstName: action.payload.first_name,
                    userLastName: action.payload.last_name,
                    userEmail: action.payload.email
                });
        default:
            return state;
    }
};