import { createThunkRoutine } from 'redux-thunk-routine';

export const showErrorRoutine = createThunkRoutine('SHOW_ERROR');
export const showModalRoutine = createThunkRoutine('SHOW_MODAL');
export const hideModalRoutine = createThunkRoutine('HIDE_MODAL');
export const logInRoutine = createThunkRoutine('LOG_IN');
export const logOutRoutine = createThunkRoutine('LOG_OUT');
export const getUserRoutine = createThunkRoutine('GET_USER');
export const editUserRoutine = createThunkRoutine('EDIT_USER');