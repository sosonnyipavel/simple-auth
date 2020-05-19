import sessions from '../api/sessions';
import {SIGN_IN, SIGN_OUT, GET_USER} from './types';
import history from '../history';

export const signIn = (formValues) => async (dispatch) => {
    const response = await sessions.post('/sessions', { email: formValues.email, password: formValues.password, session: history.location });
    dispatch( {type: SIGN_IN, payload:response.data });
    history.push('/');
};

export const getUser = (userToken) => async (dispatch) => {
    console.log(userToken);
    const response = await sessions.get(`/profile?access_token=${userToken}`);
    dispatch ({type: GET_USER, payload: response})
};

export const signOut = () => {
    return { 
        type: SIGN_OUT
    };
};
