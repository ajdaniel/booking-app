import * as Types from './actionTypes';
export const fetchEvents = () => ({ type: Types.FETCH_EVENTS });
export const fetchEventsSuccess = (events) => ({type: Types.FETCH_EVENTS_SUCCESS, events});

export const bookSeats = (eventId, seats) => ({type: Types.BOOK_SEATS, eventId, seats});

export const fetchUserEvents = (name, email) => ({ type: Types.FETCH_USER_EVENTS, name, email});
export const fetchUserEventsSuccess = (events) => ({ type: Types.FETCH_USER_EVENTS_SUCCESS, events});