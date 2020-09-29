import { getUserRoutine, editUserRoutine } from './index';
import { getThunkActionCreator } from 'redux-thunk-routine';
import sessions from '../api/sessions';
import history from '../history';


export const getUser = getThunkActionCreator (
    getUserRoutine, async (token) => {
    const response = await sessions.get(`/profile?access_token=${token}`);
    history.push('/');
    return response;
});

export const editUser = (token, userEdit) => async (dispatch) => {
    dispatch(editUserRoutine.request(token, userEdit));
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
    history.push('/signin');
    return dispatch(editUserRoutine.success(response));
};