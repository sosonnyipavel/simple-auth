import sessions from '../api/sessions';
import {SIGN_IN, SIGN_OUT, GET_USER, EDIT_USER, SHOW_MODAL, HIDE_MODAL, SHOW_ERROR} from './types';
import history from '../history';

export const signIn = (formValues) => async (dispatch) => {
    try{
        const response = await sessions.post('/sessions', { email: formValues.email, password: formValues.password, session: history.location });
        localStorage.setItem('token', response.data.session.access_token);
        dispatch( {type: SIGN_IN});
        history.push('/');
    } catch(e) {
        dispatch( {type: SHOW_ERROR, payload: e.response.data.error.message});
        history.push('/signin');
    }
};

export const getUser = (token) => async (dispatch) => {
    try {
        const response = await sessions.get(`/profile?access_token=${token}`);
        dispatch ({type: GET_USER, payload: response.data.user});
        history.push('/');
    } catch(e) {
        if ( e.response.status === 401 ) {
            localStorage.removeItem('token');
            history.push('/signin');
        } else {
            dispatch ({type: SHOW_ERROR, payload: e.response.data.error.message});
        }
    }
};

export const editUser = (token, userEdit) => async (dispatch) => {
    try {    
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
    } catch (e){
        if ( e.response.status === 401 ) {
            localStorage.removeItem('token');
            history.push('/');
        } else {
            dispatch ({type: SHOW_ERROR, payload: e.response.data.error.message});
        }

    }
};

export const signOut = (token) => async (dispatch) => {
    try {
        await sessions.delete(`/sessions?access_token=${token}`);
        localStorage.removeItem('token');
        dispatch ({type: SIGN_OUT});
        history.push('/signin');
    } catch(e) {
        if (e.response.status !== 401) {
            dispatch ({type: SHOW_ERROR, payload: e.response.data.error.message});
        } else {
            history.push('/signin');
        }
    }
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
