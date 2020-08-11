import sessions from '../api/sessions';
import {SIGN_IN, SIGN_OUT, GET_USER, EDIT_USER, SHOW_MODAL, HIDE_MODAL, SHOW_ERROR} from './types';
import history from '../history';

export const signIn = (formValues) => async (dispatch) => {
    const response = await sessions.post('/sessions', { email: formValues.email, password: formValues.password, session: history.location });
    localStorage.setItem('token', response.data.session.access_token);
    dispatch( {type: SIGN_IN});
    history.push('/');
};

export const getUser = (token) => async (dispatch) => {
    const response = await sessions.get(`/profile?access_token=${token}`);
    dispatch ({type: GET_USER, payload: response.data.user});
    history.push('/');
};

export const editUser = (token, userEdit) => async (dispatch) => {
    const response = await sessions.patch(`/profile?access_token=${token}`, 
        {
            user: 
                {   
                    first_name: userEdit.userFirstName,
                    last_name: userEdit.userLastName,
                    email: userEdit.userEmail,
                    phone: userEdit.userPhone
                } 
        });
    dispatch ({type: EDIT_USER, payload: response});
    history.push('/signin');
};

export const signOut = (token) => async (dispatch) => {
    await sessions.delete(`/sessions?access_token=${token}`);
    localStorage.removeItem('token');
    dispatch ({type: SIGN_OUT});
    history.push('/signin');
};

export const modalShow = (showModal) => {
    if(showModal){
        return {
            type: SHOW_MODAL,
            payload: 'block'
        };
    } else {
        return{
            type: HIDE_MODAL,
            payload: 'none'
        }
    }
};

export const errorCatch = (error) => async (dispatch) => {
    await dispatch ({type: SHOW_ERROR, payload: error.response});
    //history.push('/signin');
};