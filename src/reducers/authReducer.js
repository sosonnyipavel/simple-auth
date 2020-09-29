import { logInRoutine, logOutRoutine } from '../actions';
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {

    if(logInRoutine.isSuccessAction(action)){
        return {...state};
    }
    if(logOutRoutine.isSuccessAction(action)){
        return {...state};
    }
    return INITIAL_STATE;
};