import sessions from '../api/sessions';
import {SIGN_IN, SIGN_OUT, GET_USER} from './types';
import history from '../history';

export const signIn = (formValues) => async (dispatch) => {
    const response = await sessions.post('/sessions', { email: formValues.email, password: formValues.password, session: history.location });
    dispatch( {type: SIGN_IN, payload:response.data });
    localStorage.setItem('token', response.data.session.access_token);
    history.push('/');
};

export const getUser = (token) => async (dispatch) => {
    const response = await sessions.get(`/profile?access_token=${token}`);
    dispatch ({type: GET_USER, payload: response.data.user});
    history.push('/');
};

export const signOut = (token) => async (dispatch) => {
    await sessions.delete(`/sessions?access_token=${token}`);
    dispatch ({type: SIGN_OUT});
    history.push('/signin');
};
