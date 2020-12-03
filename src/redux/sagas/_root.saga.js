import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import jobSaga from './job.saga';
import subcontractorSaga from './subcontractor.saga';
import userJobSaga from './userJob.saga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    userJobSaga(),
    jobSaga(),
    subcontractorSaga(),
  ]);
}
