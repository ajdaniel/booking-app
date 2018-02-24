import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as Types from './actionTypes';
import * as actions from './actions';
import * as api from './api';

function* fetchEvents() {
    const events = yield call(api.fetchEvents)
    yield put(actions.fetchEventsSuccess(events));
}

function* watchFetchEvents() {
    yield takeEvery(Types.FETCH_EVENTS, fetchEvents);
}

export default function* rootSaga() {
    yield all([
        watchFetchEvents()
    ])
}