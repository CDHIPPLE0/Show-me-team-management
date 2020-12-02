import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createJobConnection(action) {
  try {
    yield axios.post('/api/userJob', action.payload);
  } catch (error) {
    console.log('Error with userJob creation:', error);
  }
}

function* getCurrentJobSubcontractors(action) {
  try {
    const response = yield axios.get(`/api/userJob/active/${action.id}`);
    yield put({
      type: 'POPULATE_CURRENT_JOB',
      payload: response.data,
    });
  } catch (error) {
    console.log('Error with userJob get:', error);
  }
}

function* deleteJobConnection(action) {
  try {
    yield axios.delete(`/api/userJob/deleteJobConnection/${action.id}`);
  } catch (error) {
    console.log('Error with userJob deletion');
  }
}

function* userJobSaga() {
  yield takeLatest('GET_CURRENT_JOB_SUB', getCurrentJobSubcontractors);
  yield takeLatest('DELETE_JOB_CONNECTION', deleteJobConnection);
  yield takeLatest('CREATE_JOB_CONNECTION', createJobConnection);
}

export default userJobSaga;
