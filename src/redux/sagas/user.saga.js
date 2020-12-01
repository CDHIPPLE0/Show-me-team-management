import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* editEmail(action) {
  console.log('in saga with', action);
  try {
    yield axios.put(`/api/user/editEmail/${action.id}`, action.payload);
  } catch (error) {
    console.log('Error with user email edit:', error);
  }
}

function* editPhone(action) {
  try {
    yield axios.put(`/api/user/editPhone/${action.id}`, action.payload);
  } catch (error) {
    console.log('Error with user phone edit:', error);
  }
}

function* verify(action) {
  try {
    yield axios.put(`/user/verify/${action.id}`, action.payload);
  } catch (error) {
    console.log('Error with user verification:', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('EDIT_EMAIL', editEmail);
  yield takeLatest('EDIT_PHONE', editPhone);
  yield takeLatest('VERIFY_USER', verify);
}

export default userSaga;
