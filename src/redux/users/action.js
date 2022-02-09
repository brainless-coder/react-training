import { userDataConstants } from './actionTypes';

export const userDataInitiate = () => ({
  type: userDataConstants.USERS_DATA_INITIATE
});

export const userDataSuccess = (data) => ({
  type: userDataConstants.USERS_DATA_SUCCESS,
  payload: data
});

export const userDataFailure = (error) => ({
  type: userDataConstants.USERS_DATA_FAILURE,
  payload: error
});