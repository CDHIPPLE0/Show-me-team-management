import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getVendors() {
  try {
    const response = yield axios.get('/api/vendor');
    yield put({ type: 'POPULATE_VENDORS', payload: response.data });
  } catch (error) {
    console.log('Error with jobs get:', error);
  }
}

function* deleteVendor(action) {
  try {
    yield axios.delete(`/api/vendor/deleteVendor/${action.id}`);
  } catch (error) {
    console.log('Error with vendor deletion');
  }
}

function* vendorSaga() {
  yield takeLatest('GET_VENDORS', getVendors);
  yield takeLatest('DELETE_VENDOR', deleteVendor);
}

export default vendorSaga;
