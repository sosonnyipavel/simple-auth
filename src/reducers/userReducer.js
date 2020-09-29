import { getUserRoutine, editUserRoutine  } from '../actions';
const INITIAL_STATE = {
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    userPhone: ''
}


export default (state = INITIAL_STATE, action) => {
    if(getUserRoutine.isSuccessAction(action)){
        return ({...state, 
            userFirstName: action.payload.data.user.first_name,
            userLastName: action.payload.data.user.last_name,
            userEmail: action.payload.data.user.email,
            userPhone: action.payload.data.user.phone
        });
    }
    if(editUserRoutine.isSuccessAction(action)){
        return {...state};
    }
    return state;
};