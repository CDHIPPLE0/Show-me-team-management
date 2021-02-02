import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createJobConnection(action) {
  let id = action.payload.user;
  try {
    yield axios.post('/api/userJob', action.payload);
    yield put({ type: 'STATUS_WORKING', payload: action.payload });
    yield put({ type: 'SELECT_FALSE', payload: id });
  } catch (error) {
    console.log('Error with userJob creation:', error);
  }
}

function* removeJob(action) {
  let id = action.payload;
  try {
    yield axios.delete(`/api/userJob/deleteJob/${id}`);
    const response = yield axios.get('/api/job');
    yield put({ type: 'POPULATE_JOBS', payload: response.data });
  } catch (error) {
    console.log('Error with job deletion:', error);
  }
}

function* sendAutomatedToTwilio(action) {
  let startDate = action.payload.startDate;
  let jobAddress = action.payload.jobAddress;
  let jobId = action.payload.jobId;
  let helperRate = action.payload.helperRate;
  let welderRate = action.payload.welderRate;
  let fitterRate = action.payload.fitterRate;
  let perDiem = action.payload.perDiem;
  let description = action.payload.description;
  let userArray = action.payload.userArray;
  let data = [];
  for (let index = 0; index < userArray.length; index++) {
    const user = userArray[index];
    data = {
      userId: user,
      jobId: jobId,
      startDate: startDate,
      jobAddress: jobAddress,
      helperRate: helperRate,
      welderRate: welderRate,
      fitterRate: fitterRate,
      perDiem: perDiem,
      description: description,
    };
    try {
      yield axios.post('/api/twilio/sendAutomated', data);
    } catch (error) {
      console.log('Error with userJob creation:', error);
    }
  }
}

function* sendCustomToTwilio(action) {
  let userArray = action.payload.userArray;
  let message = action.payload.message;
  let data = [];
  for (let index = 0; index < userArray.length; index++) {
    const user = userArray[index];
    data = {
      userId: user,
      message: message,
    };
    try {
      yield axios.post('/api/twilio/sendCustom', data);
    } catch (error) {
      console.log('Error with userJob creation:', error);
    }
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
  yield takeLatest('SEND_AUTOMATED', sendAutomatedToTwilio);
  yield takeLatest('SEND_CUSTOM', sendCustomToTwilio);
  yield takeLatest('REMOVE_JOB', removeJob);
}

export default userJobSaga;
