import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import modalReducer from './modalReducer';


export default combineReducers ({
    form: formReducer,
    auth: authReducer,
    user: userReducer,
    modal: modalReducer
});