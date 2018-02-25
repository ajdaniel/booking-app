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

function* bookSeats(action) {
    yield call(api.bookSeats, action.eventId, action.seats);
    yield put(actions.fetchEvents());
}

function* watchBookSeats() {
    yield takeEvery(Types.BOOK_SEATS, bookSeats);
}

export default function* rootSaga() {
    yield all([
        watchFetchEvents(),
        watchBookSeats()
    ])
}