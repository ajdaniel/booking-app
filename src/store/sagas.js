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

function* fetchUserEvents(action) {
    const userEvents = yield call(api.getUserEvents, action.name, action.email);
    yield put(actions.fetchUserEventsSuccess(userEvents));
}

function* watchFetchUserEvents() {
    yield takeEvery(Types.FETCH_USER_EVENTS, fetchUserEvents);
}

function* cancelBooking(action) {
    const event = yield call(api.cancelBooking, action.eventId, action.name, action.email);
    yield put(actions.cancelBookingSuccess(event));
}

function* watchCancelBooking() {
    yield takeEvery(Types.CANCEL_BOOKING, cancelBooking);
}

export default function* rootSaga() {
    yield all([
        watchFetchEvents(),
        watchBookSeats(),
        watchFetchUserEvents(),
        watchCancelBooking()
    ])
}