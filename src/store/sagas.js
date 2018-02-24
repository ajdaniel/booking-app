import { all, call, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as Types from './actionTypes';
import * as actions from './actions';

function* fetchEvents() {
    yield delay(1000)
    yield put(actions.fetchEventsSuccess('hello'));
}

function* watchFetchEvents() {
    yield takeEvery(Types.FETCH_EVENTS, fetchEvents);
}

export default function* rootSaga() {
    yield all([
        watchFetchEvents()
    ])
}