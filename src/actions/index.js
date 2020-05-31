import sessions from '../api/sessions';
import {SIGN_IN, SIGN_OUT, GET_USER} from './types';
import history from '../history';

export const signIn = (formValues) => async (dispatch) => {
    try{
        const response = await sessions.post('/sessions', { email: formValues.email, password: formValues.password, session: history.location });
        localStorage.setItem('token', response.data.session.access_token);
        dispatch( {type: SIGN_IN, payload:response.data });
        history.push('/');
    } catch(e) {
        localStorage.setItem('wrongAuth', true );
        history.push('/signin');
    }
};

export const getUser = (token) => async (dispatch) => {
    try {
        const response = await sessions.get(`/profile?access_token=${token}`);
        dispatch ({type: GET_USER, payload: response.data.user});
        history.push('/');
    } catch(e) {
        localStorage.removeItem('token');
        history.push('/signin');
    }
};

export const signOut = (token) => async (dispatch) => {
    await sessions.delete(`/sessions?access_token=${token}`);
    localStorage.removeItem('token');
    dispatch ({type: SIGN_OUT});
    history.push('/signin');
};
