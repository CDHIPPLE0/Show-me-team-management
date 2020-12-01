import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getSubcontractors() {
  try {
    const response = yield axios.get('/api/subcontractor');
    yield put({ type: 'POPULATE_SUBCONTRACTORS', payload: response.data });
  } catch (error) {
    console.log('Error with subcontractor get:', error);
  }
}

function* getAvailableSubcontractors() {
  try {
    const response = yield axios.get('/api/subcontractor/available');
    yield put({ type: 'AVAILABLE_SUBCONTRACTORS', payload: response.data });
  } catch (error) {
    console.log('Error with available subcontractor get:', error);
  }
}

function* deleteSubcontractor(action) {
  try {
    yield axios.delete(`/api/subcontractor/deleteSubcontractor/${action.id}`);
  } catch (error) {
    console.log('Error with subcontractor deletion');
  }
}

function* subcontractorSaga() {
  yield takeLatest('GET_SUBCONTRACTORS', getSubcontractors);
  yield takeLatest('DELETE_SUBCONTRACTOR', deleteSubcontractor);
  yield takeLatest('GET_AVAILABLE', getAvailableSubcontractors);
}

export default subcontractorSaga;
