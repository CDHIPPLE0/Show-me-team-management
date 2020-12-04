import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getJobs() {
  try {
    const response = yield axios.get('/api/job');
    console.log(response.data);
    yield put({ type: 'POPULATE_JOBS', payload: response.data });
  } catch (error) {
    console.log('Error with jobs get:', error);
  }
}

function* getThisJob(action) {
  try {
    const response = yield axios.get(`/api/job/${action.payload}`);
    console.log(response.data);
    yield put({ type: 'GET_THIS_JOB', payload: response.data });
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

function* setActive(action) {
  console.log('overhere');
  try {
    yield axios.put(`/api/job/setActive/:${action.id}`);
  } catch (error) {
    console.log('Error with set job active ');
  }
}

function* setInactive(action) {
  try {
    yield axios.put(`/api/job/setInactive/:${action.id}`);
  } catch (error) {
    console.log('Error with set job inactive ');
  }
}

function* deleteJob(action) {
  try {
    yield axios.delete(`/api/job/setInactive/${action.id}`);
  } catch (error) {
    console.log('Error with job deletion');
  }
}

function* jobSaga() {
  yield takeLatest('GET_JOBS', getJobs);
  yield takeLatest('CREATE_JOB', createJob);
  yield takeLatest('EDIT_JOB_DESCRIPTION', editJobDescription);
  yield takeLatest('EDIT_JOB_ADDRESS', editJobAddress);
  yield takeLatest('GET_JOB', getThisJob);
  yield takeLatest('DELETE_JOB', deleteJob);
  yield takeLatest('SET_ACTIVE', setActive);
  yield takeLatest('SET_INACTIVE', setInactive);
}

export default jobSaga;
