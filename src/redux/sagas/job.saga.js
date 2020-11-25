import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getJobs() {
  try {
    const response = yield axios.get('/api/job');
    yield put({ type: 'POPULATE_JOBS', payload: response.data });
  } catch (error) {
    console.log('Error with jobs get:', error);
  }
}

function* createJob(action) {
  try {
    yield axios.post('/api/job', action.payload);
  } catch (error) {
    console.log('Error with job creation:', error);
  }
}

function* editJobDescription(action) {
  try {
    yield axios.put(`/api/job/editJobDescription/:${action.id}`);
  } catch (error) {
    console.log('Error with edit job description');
  }
}

function* editJobAddress(action) {
  try {
    yield axios.put(`/api/job/editJobAddress/:${action.id}`);
  } catch (error) {
    console.log('Error with edit address description');
  }
}

function* deleteJob(action) {
  try {
    yield axios.delete(`/api/job/deleteJob/${action.id}`);
  } catch (error) {
    console.log('Error with job deletion');
  }
}

function* jobSaga() {
  yield takeLatest('GET_JOBS', getJobs);
  yield takeLatest('CREATE_JOB', createJob);
  yield takeLatest('EDIT_JOB_DESCRIPTION', editJobDescription);
  yield takeLatest('EDIT_JOB_ADDRESS', editJobAddress);
  yield takeLatest('DELETE_JOB', deleteJob);
}

export default jobSaga;
