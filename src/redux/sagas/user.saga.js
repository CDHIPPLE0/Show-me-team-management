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

function* getUnverified(action) {
  console.log('in saga with', action);
  try {
    const response = yield axios.get(`/api/unverified`);
    yield put({ type: 'GET_UNVERIFIED', payload: response.data });
  } catch (error) {
    console.log('Error with get unverified :', error);
  }
}

function* getUser(action) {
  console.log('in saga with', action);
  try {
    const response = yield axios.get(`/api/user/${action.id}`);
    yield put({ type: 'GET_DETAILS', payload: response.data });
  } catch (error) {
    console.log('Error with get user details:', error);
  }
}

function* edit(action) {
  console.log('in saga with', action.id, action.payload);
  try {
    yield axios.put(`/api/user/edit/${action.id}`, action.payload);
  } catch (error) {
    console.log('Error with user email edit:', error);
  }
}

function* updateJobStatusTrue(action) {
  try {
    yield axios.put(`/api/user/setJobStatusTrue/${action.payload.user}`);
    yield put({ type: 'GET_AVAILABLE' });
  } catch (error) {
    console.log('Error with user status update:', error);
  }
}

function* updateJobStatusFalse(action) {
  yield console.log('in the saga');
  try {
    yield axios.put(`/api/user/setJobStatusFalse/${action.id}`);
  } catch (error) {
    console.log('Error with user status update:', error);
  }
}

function* selectTrue(action) {
  try {
    yield axios.put(`/api/user/selectTrue/${action.payload}`);
    yield put({ type: 'GET_AVAILABLE' });
  } catch (error) {
    console.log('Error with user status update:', error);
  }
}

function* selectFalse(action) {
  console.log('in selectFalse', action);
  try {
    yield axios.put(`/api/user/selectFalse/${action.payload}`);
    yield put({ type: 'GET_AVAILABLE' });
  } catch (error) {
    console.log('Error with user status update:', error);
  }
}

function* selectAllTrue(action) {
  try {
    yield axios.put(`/api/user/selectAllTrue/`);
    yield put({ type: 'GET_AVAILABLE' });
  } catch (error) {
    console.log('Error with user status update:', error);
  }
}

function* selectAllFalse(action) {
  console.log('in selectFalse', action);
  try {
    yield axios.put(`/api/user/selectAllFalse/`);
    yield put({ type: 'GET_AVAILABLE' });
  } catch (error) {
    console.log('Error with user status update:', error);
  }
}

function* verify(action) {
  try {
    yield axios.put(`api/user/verify/${action.id}`);
    const response = yield axios.get(`/api/unverified`);
    yield put({ type: 'GET_UNVERIFIED', payload: response.data });
  } catch (error) {
    console.log('Error with user verification:', error);
  }
}

function* userSaga() {
  yield takeLatest('GET_UNVERIFIED_USERS', getUnverified);
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('EDIT', edit);
  yield takeLatest('VERIFY_USER', verify);
  yield takeLatest('GET_USER_DETAILS', getUser);
  yield takeLatest('STATUS_WORKING', updateJobStatusTrue);
  yield takeLatest('STATUS_NOT_WORKING', updateJobStatusFalse);
  yield takeLatest('SELECT_TRUE', selectTrue);
  yield takeLatest('SELECT_FALSE', selectFalse);
  yield takeLatest('SELECT_ALL_TRUE', selectAllTrue);
  yield takeLatest('SELECT_ALL_FALSE', selectAllFalse);
}

export default userSaga;
