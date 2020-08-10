import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import modalReducer from './modalReducer';
import errorReducer from './errorReducer';


export default combineReducers ({
    form: formReducer,
    auth: authReducer,
    user: userReducer,
    modal: modalReducer,
    error: errorReducer
});