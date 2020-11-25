import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getSubcontractors() {
  try {
    const response = yield axios.get('/api/subcontractor');
    yield put({ type: 'POPULATE_SUBCONTRACTORS', payload: response.data });
  } catch (error) {
    console.log('Error with jobs get:', error);
  }
}

function* deleteSubcontractor(action) {
  try {
    yield axios.delete(`/api/vendor/deleteSubcontractor/${action.id}`);
  } catch (error) {
    console.log('Error with subcontractor deletion');
  }
}

function* vendorSaga() {
  yield takeLatest('GET_SUBCONTRACTORS', getSubcontractors);
  yield takeLatest('DELETE_SUBCONTRACTOR', deleteSubcontractor);
}

export default vendorSaga;
